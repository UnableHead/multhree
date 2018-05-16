import {Vector2, Vector3, Quaternion} from "three";

const _ = {
  e: 0.0001,
  refButton: {left: 0, middle: 1, right: 2},
  refButtons: {none: 0, left: 1, right: 2, middle: 4}
};

class TrackballControls{

  constructor(camera, domElement){
    this.camera = camera;
    this.domElement = domElement || document;

    this.rotateSpeed = 1.0;
    this.panSpeed = 0.3;
    this.zoomSpeed = 1.2;

    this.screen = {left: 0, top: 0, width: 0, height: 0};

    this.target = new Vector3();
    this.eye = new Vector3();
    this.eye.subVectors(this.camera.position, this.target);

    this.bufferVector = new Vector2();
    this.lastMouseSphere = new Vector2();
    this.lastMouseCoord = new Vector2();

    this.handleResize = this.handleResize.bind(this);
    this.handleContextmenu = this.handleContextmenu.bind(this);
    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
    window.addEventListener("resize", this.handleResize);
    this.domElement.addEventListener("mousedown", this.handleMousedown);
    this.domElement.addEventListener("mousemove", this.handleMousemove);
    this.domElement.addEventListener("contextmenu", this.handleContextmenu);

    this.handleResize();
  }

  handleResize(){
    const box = this.domElement.getBoundingClientRect();
    const d = this.domElement.ownerDocument.documentElement;
    this.screen.left = box.left + window.pageXOffset - d.clientLeft;
    this.screen.top = box.top + window.pageYOffset - d.clientTop;
    this.screen.width = box.width;
    this.screen.height = box.height;
  }

  handleContextmenu(e){
    e.preventDefault();
  }

  handleMousedown(e){
    if(e.button === _.refButton.left){
      this.lastMouseSphere.copy(this.getMouseOnCircle(e.pageX, e.pageY));
    }else if(e.button === _.refButton.right){
      this.lastMouseCoord.copy(this.getMouseOnScreen(e.pageX, e.pageY));
    }else if(e.button === _.refButton.middle){
      this.lastMouseCoord.copy(this.getMouseOnScreen(e.pageX, e.pageY));
    }
  }

  handleMousemove(e){
    if(e.buttons & _.refButtons.left){
      this.rotateCamera(e);
    }else if(e.buttons & _.refButtons.right){
      this.panCamera(e);
    }else if(e.buttons & _.refButtons.middle){
      this.zoomCamera(e);
    }
  }

  rotateCamera(e){
    const mouseSphere = this.getMouseOnCircle(e.pageX, e.pageY),
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
    const mouseCoord = this.getMouseOnScreen(e.pageX, e.pageY),
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
    const mouseCoord = this.getMouseOnScreen(e.pageX, e.pageY),
          factor = 1.0 + (mouseCoord.y - this.lastMouseCoord.y) * this.zoomSpeed;

    if(factor !== 1.0 && factor > 0.0){
      this.eye.multiplyScalar(factor);
    }

    this.camera.position.addVectors(this.target, this.eye);

    this.lastMouseCoord.copy(mouseCoord);
  }

  getMouseOnScreen(pageX, pageY){
    return this.bufferVector.set(
      (pageX - this.screen.left) / this.screen.width,
      (pageY - this.screen.top) / this.screen.height
    );
  }

  getMouseOnCircle(pageX, pageY){
    return this.bufferVector.set(
      (pageX - this.screen.width * 0.5 - this.screen.left) / (this.screen.width * 0.5),
      (this.screen.height + 2 * (this.screen.top - pageY)) / this.screen.width
    );
  }

  update(){

  }
}

export default TrackballControls;