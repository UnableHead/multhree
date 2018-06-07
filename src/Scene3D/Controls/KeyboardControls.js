import {MeshNormalMaterial, Mesh, Vector2, Raycaster} from "three";

import keyboardMapping from "./KeyboardMapping";

const _ = {
  distanceAddMesh: 1000
};

class KeyboardControls{

  constructor(camera, groupDrag, uc){
    this.camera = camera;
    this.groupDrag = groupDrag;
    this.mouseCoord = new Vector2();
    this.raycaster = new Raycaster();
    this.uc = uc;

    this.handleKeypress = this.handleKeypress.bind(this);
  }

  handleKeypress(e){
    keyboardMapping.forEach((item) => {
      if(e.charCode === item.code){
        const geometry = new item.GeometryClass(...item.parameter());
        geometry.computeBoundingBox();
        const material = new MeshNormalMaterial();
        const meshCube = new Mesh(geometry, material);
        this.castMeshPosition(meshCube.position, meshCube.rotation);
        this.groupDrag.add(meshCube);
      }
    });
  }

  castMeshPosition(position, rotation){
    this.raycaster.setFromCamera(this.uc.getMouseOnCircle(this.mouseCoord.x, this.mouseCoord.y), this.camera);
    this.raycaster.ray.at(_.distanceAddMesh, position);
    rotation.copy(this.camera.rotation);
  }

  handleMousemove(e){
    this.mouseCoord.set(e.pageX, e.pageY);
  }

}

export default KeyboardControls;