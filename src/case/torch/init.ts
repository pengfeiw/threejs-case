import {BufferAttribute, CanvasTexture, Color, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import Points from "src/engine/object/Points";
import fs from "./.fs";
import vs from "./.vs";
import {resize} from "src/engine/threeUtil";
import * as MathUtil from "src/util/math";

let renderer: WebGLRenderer;
let camera: PerspectiveCamera;
let scene: Scene;
let points: Points;
let count = 5000;

const position = new Float32Array(count * 3);
const opacity = new Float32Array(count);
const size = new Float32Array(count);

const animation = () => {
    requestAnimationFrame(animation);

    for (let i = 0; i < count; i++) {
        position[i * 3 + 1] += 0.3;
        position[i * 3 + 0] += MathUtil.randomInt(-100, 100) / 100;
        position[i * 3 + 2] += MathUtil.randomInt(-100, 100) / 100;
    }

    for (let i = 0; i < count; i++) {
        size[i] -= 0.1;
        opacity[i] -= 0.01;


        if (size[i] < 0 || opacity[i] <= 0) {
            const rad1 = MathUtil.randomInt(0, 360) / 180 * Math.PI;
            const rad2 = MathUtil.randomInt(-90, 90) / 180 * Math.PI;
            let radius = MathUtil.randomInt(0, 100);
            const pos = MathUtil.spherical2Cartesian(rad1, rad2, radius);

            position[i * 3 + 0] = pos.x;
            position[i * 3 + 1] = pos.y;
            position[i * 3 + 2] = pos.z;
            opacity[i] = Math.random();
            size[i] = MathUtil.randomInt(5, 50);
        }
    }


    points.geometry.attributes.position.needsUpdate = true;
    points.geometry.attributes.size.needsUpdate = true;
    renderer.render(scene, camera);
};

const createTexture = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = 200;
    canvas.height = 200;
    const grad = ctx.createRadialGradient(100, 100, 20, 100, 100, 100);
    grad.addColorStop(0.2, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.8, "rgba(255, 255, 255, 0.7)");
    grad.addColorStop(1.0, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;

    ctx.ellipse(100, 100, 100, 100, 0, 0, Math.PI * 2);

    ctx.fill();

    const texture = new CanvasTexture(canvas);

    return texture;
};

const initParticles = () => {

    for (let i = 0; i < count; i++) {
        const rad1 = MathUtil.randomInt(0, 360) / 180 * Math.PI;
        const rad2 = MathUtil.randomInt(-90, 90) / 180 * Math.PI;
        let radius = MathUtil.randomInt(0, 100);
        const pos = MathUtil.spherical2Cartesian(rad1, rad2, radius);

        position[i * 3 + 0] = pos.x;
        position[i * 3 + 1] = pos.y;
        position[i * 3 + 2] = pos.z;
        opacity[i] = Math.random();
        size[i] = MathUtil.randomInt(5, 50);
    }

    points = new Points(vs, fs, true, false);
    points.setAttributes("position", new BufferAttribute(position, 3));
    points.setAttributes("opacity", new BufferAttribute(opacity, 1));
    points.setAttributes("size", new BufferAttribute(size, 1));

    points.setUniforms("pointTexture", {value: createTexture()});
    points.setUniforms("color", {value: new Color("#f87510")});

    points.geometry.attributes.position.needsUpdate = true;

    scene.add(points);
};

const on = () => {
    resize(camera, renderer);
    window.addEventListener("resize", () => resize(camera, renderer));
};

const init = (canvas: HTMLCanvasElement) => {
    renderer = new WebGLRenderer({
        antialias: true,
        canvas
    });

    camera = new PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 600);
    scene = new Scene();

    initParticles();
    on();
    animation();
};

export default init;
