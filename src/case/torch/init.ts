import {BackSide, BufferAttribute, CanvasTexture, Color, OctahedronGeometry, DodecahedronBufferGeometry, Mesh, MeshBasicMaterial, MeshPhongMaterial, PerspectiveCamera, PointLight, Scene, Vector3, WebGLRenderer} from "three";
import Points from "src/engine/object/Points";
import fs from "./.fs";
import vs from "./.vs";
import {resize} from "src/engine/threeUtil";
import * as MathUtil from "src/util/math";
import AnimatPoint from "./AnimatPoint";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let renderer: WebGLRenderer;
let camera: PerspectiveCamera;
let scene: Scene;
let points: Points;
let count = 5000;
let light: PointLight;
const animatPoints: AnimatPoint[] = [];

const position = new Float32Array(count * 3);
const opacity = new Float32Array(count);
const size = new Float32Array(count);

const animation = (time: number) => {
    requestAnimationFrame(animation);

    updateParticles(time);
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

const randomPoint = () => {
    const rad1 = MathUtil.randomInt(0, 360) / 180 * Math.PI;
    const rad2 = MathUtil.randomInt(-45, 90) / 180 * Math.PI;
    let radius = MathUtil.randomInt(0, 50);
    const pos = MathUtil.spherical2Cartesian(rad1, rad2, radius);

    const point = new AnimatPoint(pos, Math.random(), MathUtil.randomInt(5, 50));

    return point;
}

const initAnimatPoints = () => {
    for (let i = 0; i < count; i++) {
        const point = randomPoint();
        animatPoints.push(point);
    }
};

const initParticles = () => {
    for (let i = 0; i < count; i++) {
        position[i * 3 + 0] = animatPoints[i].position.x;
        position[i * 3 + 1] = animatPoints[i].position.y;
        position[i * 3 + 2] = animatPoints[i].position.z;
        opacity[i] = animatPoints[i].opacity.value;
        size[i] = animatPoints[i].size.value;
    }

    points = new Points(vs, fs, true, false);
    points.setAttributes("position", new BufferAttribute(position, 3));
    points.setAttributes("opacity", new BufferAttribute(opacity, 1));
    points.setAttributes("size", new BufferAttribute(size, 1));

    points.setUniforms("pointTexture", {value: createTexture()});
    points.setUniforms("color", {value: new Color("#f87510")});

    scene.add(points);
};

const updateParticles = (time: number) => {
    for (let i = 0; i < animatPoints.length; i++) {
        const point = animatPoints[i];

        if (point.isStart) {
            point.updateAnimation(time);
            position[i * 3 + 0] = point.position.x;
            position[i * 3 + 1] = point.position.y;
            position[i * 3 + 2] = point.position.z;
            opacity[i] = point.opacity.value;
            size[i] = point.size.value;
        } else if (point.isEnd) {
            animatPoints[i] = randomPoint();
        } else {
            const rad1 = MathUtil.randomInt(0, 360) / 180 * Math.PI;
            const rad2 = MathUtil.randomInt(45, 90) / 180 * Math.PI;
            const len = MathUtil.randomInt(0, 200);
            const move = MathUtil.spherical2Cartesian(rad1, rad2, len);

            const duration = MathUtil.randomInt(2000, 5000);
            point.to(new Vector3(point.position.x + move.x, point.position.y + move.y, point.position.z + move.z), duration)
            .sizeTo(point.size.value * 0.5 , duration)
            .opacityTo(0, duration).startAnimation();
        }
    }

    points.geometry.attributes.position.needsUpdate = true;
    points.geometry.attributes.size.needsUpdate = true;
    points.geometry.attributes.opacity.needsUpdate = true;
};

const initBackground = () => {
    var geometry = new OctahedronGeometry(1500, 1);
    var material = new MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
      side: BackSide
    });
    scene.add(new Mesh(geometry, material));
};

const initLight = () => {
    light = new PointLight(0xff6600, 1, 1800, 1);
    scene.add(light);
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

    camera = new PerspectiveCamera(45, 1, 0.1, 5000);
    camera.position.set(0, 0, 600);

    const orbitControl = new OrbitControls(camera, canvas);
    orbitControl.update();

    scene = new Scene();
    initBackground();
    initLight();
    initAnimatPoints();
    initParticles();
    on();
    requestAnimationFrame(animation);
};

export default init;
