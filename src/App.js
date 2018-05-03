import React, {Component} from "react";
import "./CSS/style.css";
import icon from "../Asset/icon.jpg";
import Label from "./Label";

class App extends Component{

    render(){
        return (
            <div className="App">
                <Label/>
                <button onClick={() => console.log("Matthias")}> Button </button>
                <img src={icon}/>
            </div>
        );
    }
}

export default App;
