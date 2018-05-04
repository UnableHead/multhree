import React, {Component} from "react";
import Header from "./Component/Header";
import CanvasViewer from "./Component/Canvas/CanvasViewer";
import "./App.css";

class App extends Component{

    render(){
        return (
            <div className="App">
                <Header/>
                <CanvasViewer/>
            </div>
        );
    }
}

export default App;
