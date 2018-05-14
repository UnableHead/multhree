import * as ThreeLib from "three";
import TrackballControls from "three-trackballcontrols";
import fontGabriola from "../../../Asset/Gabriola_Regular.typeface.json";

class SceneManager{
    constructor(canvas){
        this.canvas = canvas;
        this.camera = null;
        this.controls = null;
        this.scene = null;
        this.renderer = null;
        this.meshCube = null;
        this.animateThree = this.animateThree.bind(this);
        this.initThree();
    }

    initThree(){
        const width = this.canvas.offsetWidth, height = this.canvas.offsetHeight;
        this.camera = new ThreeLib.PerspectiveCamera(45, SceneManager.computeAspectRatio(width, height), 1, 10000);
        this.camera.position.set(0, 0, 250);
        this.camera.lookAt(new ThreeLib.Vector3(0, 0, 0));

        // Create camera control
        this.controls = new TrackballControls(this.camera);
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;

        this.scene = new ThreeLib.Scene();

        // Add cube
        const geometryCube = new ThreeLib.BoxGeometry(20, 20, 20);
        const materialCube = new ThreeLib.MeshNormalMaterial();
        this.meshCube = new ThreeLib.Mesh(geometryCube, materialCube);
        this.meshCube.position.y = -50;
        this.scene.add(this.meshCube);

        // Add arrow
        const materialArrow = new ThreeLib.LineBasicMaterial();
        const geometryArrow = new ThreeLib.Geometry();
        geometryArrow.vertices.push(new ThreeLib.Vector3(-100, -80, 0));
        geometryArrow.vertices.push(new ThreeLib.Vector3(0, -20, 0));
        geometryArrow.vertices.push(new ThreeLib.Vector3(100, -80, 0));
        const arrow = new ThreeLib.Line(geometryArrow, materialArrow);
        this.scene.add(arrow);

        // Add text
        const fontLoader = new ThreeLib.FontLoader();
        fontLoader.load(fontGabriola, (font) => {
            const materialText = new ThreeLib.MeshNormalMaterial();
            const geometryText = new ThreeLib.TextGeometry("Unable", {
                font: font,
                height: 20,
                size: 70,
                hover: 30,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 2,
                bevelSize: 1.5,
                bevelSegments: 10
            });
            geometryText.computeBoundingBox();
            // geometryText.computeVertexNormals();
            const meshText = new ThreeLib.Mesh(geometryText, materialText);
            meshText.position.x = -0.5 * (geometryText.boundingBox.max.x - geometryText.boundingBox.min.x);
            this.scene.add(meshText);
        }, (e) => console.log("onProgress", e), (e) => console.log("onError", e));


        this.renderer = new ThreeLib.WebGLRenderer({canvas: this.canvas, antialias: true});
        this.renderer.setSize(width, height);

        this.animateThree();
    }

    animateThree(){
        requestAnimationFrame(this.animateThree);
        this.meshCube.rotation.x += 0.01;
        this.meshCube.rotation.y += 0.02;
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    updateGeometry(width, height){
        this.renderer.setSize(width, height);
        this.camera.aspect = SceneManager.computeAspectRatio(width, height);
        this.camera.updateProjectionMatrix();
    }

    static computeAspectRatio(width, height){
        return width / height;
    }
}

export default SceneManager;
