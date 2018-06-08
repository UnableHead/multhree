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
class WebSocketManager{

  constructor(){
    const hostURL = _.hostProtocol + "://" + _.hostAdress;
    this._s = SocketIO.connect(hostURL);

    this._s.on("connect", this.connectionOpen);
    this._s.on("disconnect", this.connectionClose);
  }

  connectionOpen(){
    console.info("[WebSocketManager] WS Connected");
  }

  connectionClose(){
    console.info("[WebSocketManager] WS Disconnected");
  }

}

export default WebSocketManager;