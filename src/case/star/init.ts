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
        mouseposition = {
            x: event.offsetX - window.innerWidth * 0.5,
            y: event.offsetY - window.innerHeight * 0.5
        };
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
        const pos = {
            x: MathUtil.randomInt(-1000, 1000),
            y: MathUtil.randomInt(-1000, 1000),
            z: MathUtil.randomInt(-1000, 1000),
        };

        positions.push(pos.x);
        positions.push(pos.y);
        positions.push(pos.z);

        color.setHSL(i / particles, 0.6, 0.7);

        colors.push(color.r, color.g, color.b);

        sizes.push(1);
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
        geoSizes[i] = 20 * (1 + Math.sin(0.1 * i + time));
    }

    geometry.attributes.size.needsUpdate = true;

    if (mouseposition) {
        camera.position.x += (mouseposition.x - camera.position.x) * 0.05;
        camera.position.y += (-mouseposition.y - camera.position.y) * 0.05;

        camera.lookAt(0, 0, 0);
    }

    renderer.render(scene, camera);
};

const init = (canvas: HTMLCanvasElement) => {
    renderer = new WebGLRenderer({
        antialias: true,
        canvas
    });

    scene = new Scene();
    camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, 2000);
    camera.position.set(0, 0, 500);

    createParticles();
    resize(camera, renderer);

    on();

    animate();
};

export default init;
