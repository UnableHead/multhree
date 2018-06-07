import UtilsControls from "./UtilsControls";
import DragControls from "./DragControls";
import CameraControls from "./CameraControls";
import KeyboardControls from "./KeyboardControls";

class SchedulerControls{

  constructor(domElement, camera, groupDrag){
    this.onDrag = false;
    this.domElement = domElement;
    const uc = new UtilsControls(this.domElement);
    this.dragControls = new DragControls(groupDrag.children, camera, uc, domElement);
    this.cameraControls = new CameraControls(camera, uc, domElement);
    this.controlsKeyboard = new KeyboardControls(camera, groupDrag, uc);

    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);

    this.enable = true;
  }

  handleMousedown(e){
    e.preventDefault();
    if(this.dragControls.handleMousedown(e)){
      this.onDrag = true;
    }else{
      this.cameraControls.handleMousedown(e);
    }
  }

  handleMouseup(e){
    e.preventDefault();
    if(this.dragControls.handleMouseup(e)){
      this.onDrag = false;
    }else{
      this.cameraControls.handleMouseup(e);
    }
  }

  handleMousemove(e){
    e.preventDefault();
    this.dragControls.handleMousemove(e);
    if(!this.onDrag){
      this.cameraControls.handleMousemove(e);
    }
    this.controlsKeyboard.handleMousemove(e);
  }

  handleKeypress(e){
    this.controlsKeyboard.handleKeypress(e);
  }

  set enable(value){
    if(value){
      this.domElement.addEventListener("mousedown", this.handleMousedown);
      this.domElement.addEventListener("mouseup", this.handleMouseup);
      this.domElement.addEventListener("mousemove", this.handleMousemove);
      window.addEventListener("keypress", this.handleKeypress);
    }else{
      this.domElement.removeEventListener("mousedown", this.handleMousedown);
      this.domElement.removeEventListener("mouseup", this.handleMouseup);
      this.domElement.removeEventListener("mousemove", this.handleMousemove);
      window.removeEventListener("keypress", this.handleKeypress);
    }
  }

}

export default SchedulerControls;