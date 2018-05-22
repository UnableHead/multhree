const _ = {
};

class SchedulerControls{

  constructor(domElement = document, controlsTab){
    this.domElement = domElement;
    this.controlsTab = controlsTab;
    this.exclusiveControl = null;

    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);

    this.enable = true;
  }

  handleMousedown(e){
    e.preventDefault();
    const n = this.controlsTab.length;
    for(let i = 0; i < n; ++i){
      if(this.controlsTab[i].handleMousedown(e)){
        this.exclusiveControl = this.controlsTab[i];
        break;
      }
    }
  }

  handleMouseup(e){
    e.preventDefault();
    if(this.exclusiveControl !== null){
      if(this.exclusiveControl.handleMouseup(e)){
        this.exclusiveControl = null;
      }
    }else{
      this.controlsTab.forEach((item) => {
        item.handleMouseup(e);
      });
    }
  }

  handleMousemove(e){
    e.preventDefault();
    if(this.exclusiveControl !== null){
      if(this.exclusiveControl.handleMousemove(e)){
        this.exclusiveControl = null;
      }
    }else{
      this.controlsTab.forEach((item) => {
        item.handleMousemove(e);
      });
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

}

export default SchedulerControls;