import {Mesh, PerspectiveCamera, PlaneGeometry, RawShaderMaterial, Scene, TextureLoader, Vector2, WebGLRenderer} from "three";
import vs from "./tvEffect.vs";
import fs from "./tvEffect.fs";
import {getPathWithPrefix} from "src/util";
import {resize} from "src/engine/threeUtil";

let renderer: WebGLRenderer;
let scene: Scene;
let camera: PerspectiveCamera;
let post: Mesh;

const setup = (canvas: HTMLCanvasElement) => {
    renderer = new WebGLRenderer({
        antialias: true,
        canvas
    });

    scene = new Scene();
    camera = new PerspectiveCamera(45, window.innerHeight / window.innerWidth, 0.1, 1000);

    resize(camera, renderer);
};

const createImage = () => {
    const textureLoader = new TextureLoader();
    const geo = new PlaneGeometry(2, 2);
    const uniforms = {
        uTexture: {value: textureLoader.load(getPathWithPrefix("/images/pixelImage/3.jpg"))},
        uResolution: {value: new Vector2(window.innerWidth, window.innerHeight)}
    };
    const mat = new RawShaderMaterial({
        uniforms,
        fragmentShader: fs,
        vertexShader: vs
    });
    post = new Mesh(geo, mat);
    scene.add(post);
};

const loop = (time: number) => {
    requestAnimationFrame(loop);

    renderer.render(scene, camera);
};

const on = () => {
    window.addEventListener("resize", () => {
        resize(camera, renderer);
    });
};

const init = (canvas: HTMLCanvasElement) => {
    setup(canvas);
    createImage();
    on();
    requestAnimationFrame(loop);
};

export default init;
