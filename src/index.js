import _ from "lodash";
import printMe from "./print.js";
import "./CSS/style.css";
import Icon from "../Asset/icon.jpg";

function component(){
    const element = document.createElement("div");
    const btn = document.createElement("button");

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(["Hello", "webpack"], " ");
    element.classList.add("hello");

    btn.innerHTML = "Click me and check the console!";
    btn.onclick = printMe;
    element.appendChild(btn);

    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    return element;
}

document.body.appendChild(component());
