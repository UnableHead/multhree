import React, {Component} from "react";
import Header from "./Component/Header";
import CanvasView from "./Component/CanvasView";
import "./App.css";

class App extends Component{

    render(){
        return (
            <div className="App">
                <Header/>
                <CanvasView/>
            </div>
        );
    }
}

export default App;
