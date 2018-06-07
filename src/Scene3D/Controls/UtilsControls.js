import {Vector2} from "three";

class UtilsControls{

  constructor(domElement){
    this.domElement = domElement;
    this.bufferVector = new Vector2();
    this.screen = {left: 0, top: 0, width: 0, height: 0};

    this.handleResize = this.handleResize.bind(this);
    window.addEventListener("resize", this.handleResize);
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

  getMouseOnScreen(pageX, pageY){
    return this.bufferVector.set(
      (pageX - this.screen.left) / this.screen.width,
      (pageY - this.screen.top) / this.screen.height
    );
  }

  getMouseOnCircle(pageX, pageY){
    return this.bufferVector.set(
      (pageX - this.screen.width * 0.5 - this.screen.left) / (this.screen.width * 0.5),
      (this.screen.height + 2 * (this.screen.top - pageY)) / this.screen.height
    );
  }
}

export default UtilsControls;