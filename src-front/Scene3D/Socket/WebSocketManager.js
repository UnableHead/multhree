import {EventDispatcher} from "three";
import SocketIO from "socket.io-client";

const _ = {
  hostProtocol: "ws",
  hostAdress: window.location.href.split("/")[2],
  hostDevPort: 8090,
  msgName: {
    meshAdded: {up: "signalMeshAdded", down: "broadcastMeshAdded"},
    meshMoved: {up: "signalMeshMoved", down: "broadcastMeshMoved"}
  }
};

if(process.env.NODE_ENV === "development"){
  _.hostAdress = _.hostAdress.split(":")[0] + ":" + _.hostDevPort;
}

/**
 * @class WebSocketManager
 */
class WebSocketManager extends EventDispatcher{

  constructor(){
    super();
    const hostURL = _.hostProtocol + "://" + _.hostAdress;
    this._s = SocketIO.connect(hostURL);

    this.onMeshMoved = this.onMeshMoved.bind(this);
    this.onMeshAdded = this.onMeshAdded.bind(this);

    this._s.on("connect", this.connectionOpen);
    this._s.on("disconnect", this.connectionClose);
    this._s.on(_.msgName.meshAdded.down, this.onMeshAdded);
    this._s.on(_.msgName.meshMoved.down, this.onMeshMoved);
  }

  connectionOpen(){
    console.info("[WebSocketManager] WS Connected");
  }

  connectionClose(){
    console.info("[WebSocketManager] WS Disconnected");
  }

  emitMeshAdded(mesh){
    mesh.name = this._s.id + "_" + mesh.id;
    const position = mesh.position;
    const sendData = {meshData: {
      name: mesh.name,
      position: [position.x, position.y, position.z],
      typeCode: mesh.typeCode
    }};
    this._s.emit(_.msgName.meshAdded.up, sendData);
  }

  onMeshAdded(supplyData){
    this.dispatchEvent({type: "onMeshAdded", supplyData: supplyData});
  }

  emitMeshMoved(meshData){
    const position = meshData.position;
    const sendData = {meshData: {
      name: meshData.name,
      position: [position.x, position.y, position.z]
    }};
    this._s.emit(_.msgName.meshMoved.up, sendData);
  }

  onMeshMoved(supplyData){
    this.dispatchEvent({type: "onMeshMoved", supplyData: supplyData});
  }

}

export default WebSocketManager;