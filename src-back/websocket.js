
const libIO = require("socket.io");

class WebSocketServer extends libIO{

  constructor(serve){
    super(serve, {
      serveClient: false
    });

    this.initConnection = this.initConnection.bind(this);
    this.on("connection", this.initConnection);
  }

  initConnection(socket){
    console.log("Socket ON");
    socket.on("sendObjectMoved", this.onObjectMoved);
    socket.on("disconnect", this.disconnectConnection);
  }

  disconnectConnection(){
    console.log("Socket OFF");
  }

  onObjectMoved(objectData){
    this.broadcast.emit("objectMoved", objectData);
  }

}

module.exports = WebSocketServer;