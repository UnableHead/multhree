import {EventDispatcher, Raycaster, Plane, Vector3} from "three";
import UtilsControls from "./UtilsControls";

const _ = {
  refButton: {left: 0, middle: 1, right: 2},
  refCursorState: {name: "cursor", auto: "auto", grab: "grab", grabbing: "grabbing"}

};

class DragControls extends EventDispatcher{

  constructor(objects, camera, domElement = document){
    super();
    this.objectsList = objects;
    this.camera = camera;
    this.domElement = domElement;
    this.uc = new UtilsControls(this.domElement);
    this.selected = null;
    this.hovered = null;

    this.raycaster = new Raycaster();
    this.plane = new Plane();
    this.cameraDirection = new Vector3();

    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);

    this.domElement.addEventListener("mousedown", this.handleMousedown);
    this.domElement.addEventListener("mouseup", this.handleMouseup);
    this.domElement.addEventListener("mousemove", this.handleMousemove);
  }

  handleMousedown(e){
    if(e.button === _.refButton.left){
      this.selected = this.getObjectOnMouse(e.pageX, e.pageY);
      if(this.selected !== null){
        this.camera.getWorldDirection(this.cameraDirection);
        this.plane.setFromNormalAndCoplanarPoint(this.cameraDirection, this.selected.position);
        this.domElement.setAttribute(_.refCursorState.name, _.refCursorState.grabbing);
        this.dispatchEvent({type: "dragstart", object: this.selected});
      }
    }
  }

  handleMouseup(e){
    e.preventDefault();
    if(e.button === _.refButton.left && this.selected){
      this.selected = null;
      this.domElement.setAttribute(_.refCursorState.name, _.refCursorState.grab);
      this.dispatchEvent({type: "dragend", object: this.selected});
    }
  }

  handleMousemove(e){
    e.preventDefault();
    if(this.selected){
      this.moveSelected(e.pageX, e.pageY);
    }else{
      const hoveredObject = this.getObjectOnMouse(e.pageX, e.pageY);
      if(this.hovered === null && hoveredObject !== null){
        this.domElement.setAttribute(_.refCursorState.name, _.refCursorState.grab);
      }else if(this.hovered !== null && hoveredObject === null){
        this.domElement.setAttribute(_.refCursorState.name, _.refCursorState.auto);
      }
      this.hovered = hoveredObject;
    }
  }

  getObjectOnMouse(pageX, pageY){
    this.raycaster.setFromCamera(this.uc.getMouseOnCircle(pageX, pageY), this.camera);
    const intersects = this.raycaster.intersectObjects(this.objectsList);
    if (intersects.length > 0){
      return intersects[0].object;
    }else{
      return null;
    }
  }

  moveSelected(pageX, pageY){
    this.raycaster.setFromCamera(this.uc.getMouseOnCircle(pageX, pageY), this.camera);
    this.raycaster.ray.intersectPlane(this.plane, this.selected.position);
  }

}

export default DragControls;