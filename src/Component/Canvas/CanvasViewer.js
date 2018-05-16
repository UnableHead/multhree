import React, {Component} from "react";
import SceneManager from "./SceneManager";
import "./CanvasViewer.css";

class CanvasViewer extends Component{

    constructor(props){
        super(props);
        this.updateGeometry = this.updateGeometry.bind(this);
    }

    componentDidMount(){
        window.addEventListener("resize", this.updateGeometry);
        this.scenesManager = new SceneManager(this.canvas);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.updateGeometry);
    }

    updateGeometry(){
        this.canvas.style.width = "";
        this.canvas.style.height = "";
        this.scenesManager.updateGeometry(this.rootCanvas.offsetWidth, this.rootCanvas.offsetHeight);
    }

    render(){
        return (
            <div className="App-root-canvas" ref={(input) => this.rootCanvas = input}>
                <canvas className="App-canvas" ref={(input) => this.canvas = input}/>
            </div>
        );
    }
}

export default CanvasViewer;
