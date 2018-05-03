import React, {Component} from "react";
import "./CanvasViewer.css";

class CanvasView extends Component{

    constructor(props){
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount(){
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions(){
        console.log("Matthias", this.canvas.offsetWidth, this.canvas.offsetHeight);
    }

    render(){
        return (
            <div className="App-canvas" ref={(input) => this.canvas = input}/>
        );
    }
}

export default CanvasView;
