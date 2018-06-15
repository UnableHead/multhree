import {EventDispatcher} from "three";
import SocketIO from "socket.io-client";

const _ = {
  hostProtocol: "ws",
  hostAdress: window.location.href.split("/")[2],
  hostDevPort: 8090,
  msgName: {
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

    this.receiveObjectMove = this.receiveObjectMove.bind(this);

    this._s.on("connect", this.connectionOpen);
    this._s.on("disconnect", this.connectionClose);
    this._s.on("objectMoved", this.receiveObjectMove);
  }

  connectionOpen(){
    console.info("[WebSocketManager] WS Connected");
  }

  connectionClose(){
    console.info("[WebSocketManager] WS Disconnected");
  }

  handleObjectMoved(objectData){
    const position = objectData.position;
    this._s.emit("sendObjectMoved", {id: objectData.id, position: [position.x, position.y, position.z]});
  }

  receiveObjectMove(objectData){
    this.dispatchEvent({type: "setObjectPosition", objectData: objectData});
  }

}

export default WebSocketManager;