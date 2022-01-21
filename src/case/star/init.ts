import {
    Float32BufferAttribute,
    BufferGeometry,
    Color,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    CanvasTexture
} from "three";
import fs from "./points.fs";
import vs from "./points.vs";
import Points from "src/engine/object/Points";
import {resize} from "src/engine/threeUtil";
import * as MathUtil from "src/util/math";

let camera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let geometry: BufferGeometry;
const particles = 3000;

let mouseposition: {x: number; y: number};
const on = () => {
    window.addEventListener("resize", () => {
        resize(camera, renderer);
    });

    window.addEventListener("mousemove", (event) => {
        mouseposition = {x: event.offsetX, y: event.offsetY};
    });
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
    grad.addColorStop(0.8, "rgba(255, 255, 255, 0.7)");
    grad.addColorStop(1.0, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    const or = 100, ir = 50;
    const ops: {x: number; y: number}[] = [];
    const ips: {x: number; y: number}[] = [];
    for (let angle = 0; angle < 2 * Math.PI; angle += 2 * Math.PI / 5) {
        const op = {
            x: Math.cos(angle) * or + 100,
            y: Math.sin(angle) * or + 100
        };

        const ip = {
            x: Math.cos(angle + 2 * Math.PI / 10) * ir + 100,
            y: Math.sin(angle + 2 * Math.PI / 10) * ir + 100
        };

        ops.push(op);
        ips.push(ip);
    }

    ctx.beginPath();
    ctx.moveTo(ops[0].x, ops[0].y);
    for (let i = 1; i < ops.length; i++) {
        ctx.lineTo(ips[i - 1].x, ips[i - 1].y);
        ctx.lineTo(ops[i].x, ops[i].y);
    }
    ctx.lineTo(ips[4].x, ips[4].y);
    ctx.closePath();
    ctx.fill();

    texture = new CanvasTexture(ctx.canvas);
    return texture;
};

const createParticles = () => {
    const positions = [];
    const colors = [];
    const color = new Color();
    const sizes = [];
    for (let i = 0; i < particles; i++) {
        const rad1 = MathUtil.degree2Radian(MathUtil.randomInt(0, 360));
        const rad2 = MathUtil.degree2Radian(MathUtil.randomInt(-90, 90));
        const radius = MathUtil.randomInt(50, 100);
        const pos = MathUtil.spherical2Cartesian(rad1, rad2, radius);

        positions.push(pos.x);
        positions.push(pos.y);
        positions.push(pos.z);

        color.setHSL(i / particles, 0.6, 0.7);

        colors.push(color.r, color.g, color.b);

        sizes.push(Math.random() * 5);
    }

    const particleSystem = new Points(vs, fs);
    geometry = particleSystem.geometry;
    particleSystem.material.vertexColors = true;

    particleSystem.setAttributes("position", new Float32BufferAttribute(positions, 3));
    particleSystem.setAttributes("color", new Float32BufferAttribute(colors, 3));
    particleSystem.setAttributes("size", new Float32BufferAttribute(sizes, 1));
    particleSystem.setUniforms("pointTexture", {value: createTexture()});

    scene.add(particleSystem);
};

const animate = () => {
    const time = Date.now() * 0.001;

    requestAnimationFrame(animate);
    const geoSizes = geometry.attributes.size.array as number[];

    for (let i = 0; i < particles; i++) {
        geoSizes[i] = 3 * (1 + Math.sin(0.1 * i + time));
    }

    geometry.attributes.size.needsUpdate = true;

    if (mouseposition) {
        const h = (mouseposition.x - window.innerWidth * 0.5) / (window.innerWidth * 0.5);
        const v = (mouseposition.y - window.innerHeight * 0.5) / (window.innerHeight * 0.5);
        camera.rotation.x -= 0.005 * v;
        camera.rotation.y -= 0.005 * h;

        camera.rotation.x = MathUtil.clamp(camera.rotation.x, -Math.PI * 0.25, Math.PI * 0.25);
        camera.rotation.y = MathUtil.clamp(camera.rotation.y, -Math.PI * 0.25, Math.PI * 0.25);
    }

    renderer.render(scene, camera);
};

const init = (canvas: HTMLCanvasElement) => {
    renderer = new WebGLRenderer({
        antialias: true,
        canvas
    });

    scene = new Scene();
    camera = new PerspectiveCamera(45, 1, 20, 100);
    camera.position.set(0, 0, 0);
    
    createParticles();
    resize(camera, renderer);

    on();

    animate();
};

export default init;
