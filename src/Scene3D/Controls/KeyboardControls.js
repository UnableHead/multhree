import {BoxGeometry, MeshNormalMaterial, Mesh} from "three";

const _ = {
  ADD_CUBE_BUTTON: 97
};

class KeyboardControls{

  constructor(addMeshDrag){
    this.addMeshDrag = addMeshDrag;

    this.handleKeypress = this.handleKeypress.bind(this);

    this.enable = true;
  }

  handleKeypress(e){
    console.log("Matthias", e);
    if(e.charCode === _.ADD_CUBE_BUTTON){
      const geometryCube = new BoxGeometry(20, 20, 20);
      geometryCube.computeBoundingBox();
      const materialCube = new MeshNormalMaterial();
      const meshCube = new Mesh(geometryCube, materialCube);
      this.addMeshDrag(meshCube);
    }
  }

  set enable(value){
    if(value){
      window.addEventListener("keypress", this.handleKeypress);
    }else{
      window.removeEventListener("keypress", this.handleKeypress);
    }
  }

}

export default KeyboardControls;