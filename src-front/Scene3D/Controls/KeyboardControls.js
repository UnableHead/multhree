import {Vector2, Raycaster, EventDispatcher} from "three";
import SceneManager from "../SceneManager";

const _ = {
  distanceAddMesh: 1000
};

class KeyboardControls extends EventDispatcher{

  constructor(camera, groupDrag, uc){
    super();
    this.camera = camera;
    this.groupDrag = groupDrag;
    this.mouseCoord = new Vector2();
    this.raycaster = new Raycaster();
    this.uc = uc;

    this.handleKeypress = this.handleKeypress.bind(this);
  }

  handleKeypress(e){
    const mesh = SceneManager.createMesh(e.charCode);
    if(mesh !== null){
      this.castMeshPosition(mesh.position, mesh.rotation);
      this.groupDrag.add(mesh);
      this.dispatchEvent({type: "meshAdded", meshData: mesh});
    }
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