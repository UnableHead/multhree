import {Vector2, Vector3, Quaternion} from "three";
import UtilsControls from "./UtilsControls";

const _ = {
  refButton: {left: 0, middle: 1, right: 2},
  refButtons: {none: 0, left: 1, right: 2, middle: 4},
  refCursorState: {name: "cursor", auto: "auto", move: "move", zoomIn: "zoom-in"}
};

class TrackballControls{

  constructor(camera, domElement = document){
    this.camera = camera;
    this.domElement = domElement;
    this.uc = new UtilsControls(this.domElement);

    this.rotateSpeed = 1.0;
    this.panSpeed = 2.0;
    this.zoomSpeed = 1.2;

    this.target = new Vector3();
    this.eye = new Vector3();
    this.eye.subVectors(this.camera.position, this.target);

    this.lastMouseSphere = new Vector2();
    this.lastMouseCoord = new Vector2();

    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);

    this.enable = true;
  }

  handleMousedown(e){
    e.preventDefault();
    let cursorState = _.refCursorState.auto;
    if(e.button === _.refButton.left){
      cursorState = _.refCursorState.move;
      this.lastMouseSphere.copy(this.uc.getMouseOnCircle(e.pageX, e.pageY));
    }else if(e.button === _.refButton.right){
      cursorState = _.refCursorState.move;
      this.lastMouseCoord.copy(this.uc.getMouseOnScreen(e.pageX, e.pageY));
    }else if(e.button === _.refButton.middle){
      cursorState = _.refCursorState.zoomIn;
      this.lastMouseCoord.copy(this.uc.getMouseOnScreen(e.pageX, e.pageY));
    }
    this.domElement.setAttribute(_.refCursorState.name, cursorState);
  }

  handleMouseup(e){
    e.preventDefault();
    this.domElement.setAttribute("cursor", "auto");
  }

  handleMousemove(e){
    e.preventDefault();
    if(e.buttons & _.refButtons.left){
      this.rotateCamera(e);
    }else if(e.buttons & _.refButtons.right){
      this.panCamera(e);
    }else if(e.buttons & _.refButtons.middle){
      this.zoomCamera(e);
    }
  }

  set enable(value){
    if(value){
      this.domElement.addEventListener("mousedown", this.handleMousedown);
      this.domElement.addEventListener("mouseup", this.handleMouseup);
      this.domElement.addEventListener("mousemove", this.handleMousemove);
    }else{
      this.domElement.removeEventListener("mousedown", this.handleMousedown);
      this.domElement.removeEventListener("mouseup", this.handleMouseup);
      this.domElement.removeEventListener("mousemove", this.handleMousemove);
    }
  }

  rotateCamera(e){
    const mouseSphere = this.uc.getMouseOnCircle(e.pageX, e.pageY),
          moveDirection = new Vector3(),
          eyeDirection = new Vector3(),
          objectUpDirection = new Vector3(),
          objectSidewaysDirection = new Vector3(),
          axis = new Vector3(),
          quaternion = new Quaternion();

    moveDirection.set(mouseSphere.x - this.lastMouseSphere.x, mouseSphere.y - this.lastMouseSphere.y, 0);
    this.eye.copy(this.camera.position).sub(this.target);
    eyeDirection.copy(this.eye).normalize();
    objectUpDirection.copy(this.camera.up).normalize();
    objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();
    objectUpDirection.setLength(moveDirection.y);
    objectSidewaysDirection.setLength(moveDirection.x);
    moveDirection.copy(objectUpDirection).add(objectSidewaysDirection);
    axis.crossVectors(moveDirection, this.eye).normalize();
    const angle = moveDirection.length() * this.rotateSpeed;
    quaternion.setFromAxisAngle(axis, angle);

    this.eye.applyQuaternion(quaternion);
    this.camera.up.applyQuaternion(quaternion);

    this.camera.position.addVectors(this.target, this.eye);
    this.camera.lookAt(this.target);

    // Reset camera yaw (rotation on Y axe)
    eyeDirection.copy(this.eye).normalize();
    objectUpDirection.copy(this.camera.up).normalize();
    objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection);
    objectSidewaysDirection.y = 0;
    objectSidewaysDirection.normalize();
    this.camera.up.crossVectors(eyeDirection, objectSidewaysDirection).normalize();
    this.camera.up.y = Math.abs(this.camera.up.y);

    this.lastMouseSphere.copy(mouseSphere);
  }

  panCamera(e){
    const mouseCoord = this.uc.getMouseOnScreen(e.pageX, e.pageY),
          mouseChange = new Vector2(),
          objectUp = new Vector3(),
          pan = new Vector3();

    mouseChange.copy(mouseCoord).sub(this.lastMouseCoord);
    mouseChange.multiplyScalar(this.eye.length() * this.panSpeed);
    objectUp.copy(this.camera.up);
    pan.copy(this.eye).cross(objectUp).setLength(mouseChange.x);
    pan.add(objectUp.setLength(mouseChange.y));

    this.camera.position.add(pan);
    this.target.add(pan);

    this.lastMouseCoord.copy(mouseCoord);
  }

  zoomCamera(e){
    const mouseCoord = this.uc.getMouseOnScreen(e.pageX, e.pageY),
          factor = 1.0 + (mouseCoord.y - this.lastMouseCoord.y) * this.zoomSpeed;

    if(factor !== 1.0 && factor > 0.0){
      this.eye.multiplyScalar(factor);
    }

    this.camera.position.addVectors(this.target, this.eye);

    this.lastMouseCoord.copy(mouseCoord);
  }

  update(){

  }
}

export default TrackballControls;