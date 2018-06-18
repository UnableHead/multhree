const libIO = require("socket.io");

const _ = {
  meshAdded: {up: "signalMeshAdded", down: "broadcastMeshAdded"},
  meshMoved: {up: "signalMeshMoved", down: "broadcastMeshMoved"}
};

class WebSocketServer extends libIO{

  constructor(serve){
    super(serve, {
      serveClient: false
    });
    this.groupMesh = {};

    this.initConnection = this.initConnection.bind(this);
    this.on("connection", this.initConnection);
  }

  initConnection(socket){
    console.log("Socket ON");
    socket.groupMesh = this.groupMesh;
    for(const name in this.groupMesh){
      socket.emit(_.meshAdded.down, {meshData: this.groupMesh[name]});
    }
    socket.on(_.meshAdded.up, this.onObjectAdded);
    socket.on(_.meshMoved.up, this.onObjectMoved);
    socket.on("disconnect", this.disconnectConnection);
  }

  disconnectConnection(){
    console.log("Socket OFF");
  }

  onObjectAdded(data){
    const meshData = data.meshData;
    this.groupMesh[meshData.name] = meshData;
    this.broadcast.emit(_.meshAdded.down, data);
  }

  onObjectMoved(data){
    const mesh = this.groupMesh[data.meshData.name];
    if(typeof mesh !== "undefined"){
      mesh.position = data.meshData.position;
    }
    this.broadcast.emit(_.meshMoved.down, data);
  }

}

module.exports = WebSocketServer;