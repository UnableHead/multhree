import * as ThreeLib from "three";

class SceneManager{
    constructor(canvas){
        this.canvas = canvas;
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.geometry = null;
        this.material = null;
        this.mesh = null;
        this.animateThree = this.animateThree.bind(this);
        this.initThree();
    }

    initThree(){
        const width = this.canvas.offsetWidth, height = this.canvas.offsetHeight;
        this.camera = new ThreeLib.PerspectiveCamera(70, SceneManager.computeAspecRatio(width, height), 0.001, 100);
        this.camera.position.z = 1;

        this.scene = new ThreeLib.Scene();

        this.geometry = new ThreeLib.BoxGeometry(0.5, 0.5, 0.5);
        this.material = new ThreeLib.MeshNormalMaterial();

        this.mesh = new ThreeLib.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        this.renderer = new ThreeLib.WebGLRenderer({canvas: this.canvas, antialias: true});
        this.renderer.setSize(width, height);

        this.animateThree();
    }

    animateThree(){
        requestAnimationFrame(this.animateThree);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    }

    updateGeometry(width, height){
        this.renderer.setSize(width, height);
        this.camera.aspect = SceneManager.computeAspecRatio(width, height);
        this.camera.updateProjectionMatrix();
    }

    static computeAspecRatio(width, height){
        return width / height;
    }
}

export default SceneManager;
