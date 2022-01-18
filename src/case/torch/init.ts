import {AdditiveBlending, BoxBufferGeometry, BoxGeometry, BufferAttribute, BufferGeometry, Color, Mesh, MeshBasicMaterial, NearestFilter, PerspectiveCamera, Scene, ShaderMaterial, Texture, Vector3, WebGLRenderer} from "three";
import * as ThreeUtil from "src/engine/threeUtil";
import fs from "./points.fs";
import vs from "./points.vs";
import Points from "src/engine/object/Points";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let renderer: WebGLRenderer;
let scene: Scene;
let camera: PerspectiveCamera;
let position = new Vector3(0, 0, 0); // the position of torch
let count = 1;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
const opacities = new Float32Array(count);
const points = new Points(vs, fs);
const sizes = new Float32Array(count);

const on = () => {
    window.addEventListener("resize", () => ThreeUtil.resize(camera, renderer));
};

const loop = (time: number) => {
    renderer.render(scene, camera);

    requestAnimationFrame(loop);
};

const createTexture = function () {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    var grad = null;
    var texture = null;

    canvas.width = 200;
    canvas.height = 200;
    grad = ctx.createRadialGradient(100, 100, 20, 100, 100, 100);
    grad.addColorStop(0.2, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
    grad.addColorStop(1.0, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.arc(100, 100, 100, 0, Math.PI * 2, true);
    ctx.fill();

    texture = new Texture(canvas);
    texture.minFilter = NearestFilter;
    texture.needsUpdate = true;
    return texture;
};

const initData = () => {
    const texture = createTexture();

    const radius = 100;
    for (let i = 0; i < count; i++) {
        const x = 0;
        const y = 0;
        const z = 0;

        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        var h = Math.floor(Math.random() * 45);
        var s = Math.floor(Math.random() * 30 + 60);
        var color = new Color('hsl(' + h + ', ' + s + '%, 50%)');
        color.toArray(colors, i * 3);

        opacities[i] = Math.random();
        sizes[i] = Math.random() * 10;
    }

    points.setAttributes("positions", new BufferAttribute(positions, 3));
    // points.setAttributes("customColor", new BufferAttribute(colors, 3));
    // points.setAttributes("vertexOpacity", new BufferAttribute(opacities, 1));
    // points.setAttributes("size", new BufferAttribute(sizes, 1));

    // points.setUniforms("color", {value: new Color(0xffffff)})
    // points.setUniforms("texture", {value: texture});
    // points.material.blending = AdditiveBlending;

}

const init = (canvas: HTMLCanvasElement) => {
    renderer = new WebGLRenderer({
        antialias: true,
        canvas
    });
    scene = new Scene();
    camera = new PerspectiveCamera(45, 1, 0.1, 10000);
    camera.position.set(0, 0, 100);
    const orbitControls = new OrbitControls(camera, canvas);
    orbitControls.update();

    // const cubegeo = new BoxBufferGeometry(10, 10, 10);
    // const mat = new MeshBasicMaterial({color: "red"});
    // const cube = new Mesh(cubegeo, mat);

    // scene.add(cube);

    // initData();
    const geo = new BufferGeometry();
    const mat = new ShaderMaterial({
        
    })


    // scene.add(points);
    ThreeUtil.resize(camera, renderer);
    requestAnimationFrame(loop);
    on();
};

export default init;
