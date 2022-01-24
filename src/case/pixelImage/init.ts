import {
    PerspectiveCamera,
    Scene,
    Texture,
    TextureLoader,
    WebGLRenderer,
    InstancedBufferGeometry,
    BufferAttribute,
    InstancedBufferAttribute,
    Vector2,
    RawShaderMaterial,
    Mesh,
    DoubleSide
} from "three";
import {resize} from "src/engine/threeUtil";
import {getPathWithPrefix} from "src/util";
import fs from "./pixelImage.fs";
import vs from "./pixelImage.vs";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let renderer: WebGLRenderer;
let scene: Scene;
let camera: PerspectiveCamera;
let loader: TextureLoader;
let texture: Texture;
let colors: Float32Array;
let totalPoints = 0;
let width = 0, height = 0;

const loop = () => {
    requestAnimationFrame(loop);

    renderer.render(scene, camera);
};

const pixelExtraction = () => {
    width = texture.image.width;
    height = texture.image.height;
    totalPoints = width * height;

    const img = texture.image;
    const temCanvas = document.createElement("canvas");
    const ctx = temCanvas.getContext("2d") as CanvasRenderingContext2D;
    temCanvas.width = width;
    temCanvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const imgData = ctx.getImageData(0, 0, width, height);

    colors = Float32Array.from(imgData.data);
};

const initParticles = () => {
    const geometryParticles = new InstancedBufferGeometry();
    const positions = new BufferAttribute(new Float32Array(4 * 3), 3);
    positions.setXYZ(0, -0.5, 0.5, 0.0);
    positions.setXYZ(1, 0.5, 0.5, 0.0);
    positions.setXYZ(2, -0.5, -0.5, 0.0);
    positions.setXYZ(3, 0.5, -0.5, 0.0);
    geometryParticles.setAttribute('position', positions);

    const uvs = new BufferAttribute(new Float32Array(4 * 2), 2);
    uvs.setXY(0, 0, 1);
    uvs.setXY(1, 1, 1);
    uvs.setXY(2, 0, 0);
    uvs.setXY(3, 1, 0);
    geometryParticles.setAttribute("uv", uvs);

    geometryParticles.setIndex(new BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));

    const offsets = new Float32Array(totalPoints * 2);
    const pindexs = new Float32Array(totalPoints);

    for (let i = 0; i < totalPoints; i++) {
        offsets[i * 2 + 0] = i % width;
        offsets[i * 2 + 1] = Math.floor(i / width);
        pindexs[i] = i;
    }

    geometryParticles.setAttribute("offset", new InstancedBufferAttribute(offsets, 2, false));

    const uniforms = {
        uTextureSize: {value: new Vector2(width, height)},
        uTexture: {value: texture},
    };

    const materialParticles = new RawShaderMaterial({
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: fs,
        depthTest: false,
        transparent: true,
        side: DoubleSide
    });
    scene.add(new Mesh(geometryParticles, materialParticles));
};

const start = (tex: Texture) => {
    texture = tex;
    pixelExtraction();
    initParticles();
    loop();
};

const setup = (canvas: HTMLCanvasElement) => {
    renderer = new WebGLRenderer({
        antialias: true,
        canvas
    });
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 300);

    const orbitControl = new OrbitControls(camera, canvas);
    orbitControl.update();

    scene = new Scene();
    loader = new TextureLoader();
    resize(camera, renderer);
};

const on = () => {
    window.addEventListener("resize", () => resize(camera, renderer));
}

const init = (canvas: HTMLCanvasElement) => {
    setup(canvas);
    on();
    loader.load(getPathWithPrefix("/images/pixelImage/1.jpg"), start);
};

export default init;
