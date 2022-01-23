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
    Mesh
} from "three";
import {resize} from "src/engine/threeUtil";
import {getPathWithPrefix} from "src/util";

let renderer: WebGLRenderer;
let scene: Scene;
let camera: PerspectiveCamera;
let loader: TextureLoader;
let texture: Texture;
let colors: Float32Array;
let totalPoints = 0;
let width = 0, height = 0;

function vertexShader() {
    return `
        precision highp float;
        attribute float pindex;
        attribute vec3 position;
        attribute vec3 offset;
        attribute vec2 uv;
        attribute float angle;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uRandom;
        uniform float uDepth;
        uniform float uSize;
        uniform vec2 uTextureSize;
        uniform sampler2D uTexture;
        uniform sampler2D uTouch;
        varying vec2 vPUv;
        varying vec2 vUv;
        
        vec3 mod289(vec3 x) {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
        }
        
        vec2 mod289(vec2 x) {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
        }
        
        vec3 permute(vec3 x) {
            return mod289(((x*34.0)+1.0)*x);
        }
        
        float snoise(vec2 v)
            {
            const vec4 C = vec4(0.211324865405187, 
                                0.366025403784439, 
                            -0.577350269189626,  
                                0.024390243902439); 
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
        
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
        
            i = mod289(i); // Avoid truncation effects in permutation
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
        
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
        
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        float random(float n) {
            return fract(sin(n) * 43758.5453123);
        }
        
        void main() {
            vUv = uv;
            
            vec2 puv = offset.xy / uTextureSize;
            vPUv = puv;
        
            vec4 colA = texture2D(uTexture, puv);
            float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
        
            vec3 displaced = offset;     
            displaced.xy += vec2(random(pindex) - 0.5, random(offset.x + pindex) - 0.5) * uRandom;
            float rndz = (random(pindex) + snoise(vec2(pindex * 0.1, uTime * 0.1)));  
            displaced.z += rndz * (random(pindex) * 2.0 * uDepth);               
            displaced.xy -= uTextureSize * 0.5;
        
            float t = texture2D(uTouch, puv).r;
            displaced.z += t * -40.0 * rndz;
            displaced.x += cos(angle) * t * 40.0 * rndz;
            displaced.y += sin(angle) * t * 40.0 * rndz;     //20
        
            float psize = (snoise(vec2(uTime, pindex) * 0.5) + 2.0);
            psize *= max(grey, 0.2);
            psize *= uSize;
        
            vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
            mvPosition.xyz += position * psize;
            gl_Position = projectionMatrix * mvPosition;
        }
    `
}

function fragmentShader() {
    return `
        precision highp float;
        uniform sampler2D uTexture;
        uniform float uAlphaCircle;        
        uniform float uAlphaSquare;          
        uniform float uCircleORsquare;
        varying vec2 vPUv;
        varying vec2 vUv;
        void main() {
            vec4 color = vec4(0.0);
            vec2 uv = vUv;
            vec2 puv = vPUv;
            vec4 colA = texture2D(uTexture, puv);
            float border = 0.3;
            float radius = 0.5;
            float dist = radius - distance(uv, vec2(0.5));   
            float t = smoothstep(uCircleORsquare, border, dist);
            color = colA;
            color.a = t;
            //gl_FragColor = vec4(color.r, color.g, color.b, uAlphaSquare);
            gl_FragColor = vec4(color.r, color.g, color.b, t - uAlphaCircle);
        }
    `
}

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
    uvs.setXY(0, 0.0, 0.0);
    uvs.setXY(1, 1.0, 0.0);
    uvs.setXY(2, 0.0, 1.0);
    uvs.setXY(3, 1.0, 1.0);
    geometryParticles.setAttribute("uv", uvs);

    geometryParticles.setIndex(new BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));

    const offsets = new Float32Array(totalPoints * 3); 
    const indices = new Uint16Array(totalPoints);
    const angles = new Float32Array(totalPoints);
    for (let i = 0, j = 0; i < totalPoints; i++) {
        offsets[j * 3 + 0] = i % width;
        offsets[j * 3 + 1] = Math.floor(i / width);
        indices[j] = i;
        angles[j] = Math.random() * Math.PI;
        j++;
    }

    geometryParticles.setAttribute('offset', new InstancedBufferAttribute(offsets, 3, false));
    geometryParticles.setAttribute('angle', new InstancedBufferAttribute(angles, 1, false));
    geometryParticles.setAttribute('pindex', new InstancedBufferAttribute(indices, 1, false));

    const uniforms = {
        uTime: { value: 0 },
        uRandom: { value: 3.0 },
        uDepth: { value: 30.0 },
        uSize: { value: 1.5 },    
        uTextureSize: { value: new Vector2(width, height) },
        uTexture: { value: texture },
        uTouch: { value: null },            
        uAlphaCircle: { value: 0.0 },        
        uAlphaSquare: { value: 1.0 },
        uCircleORsquare: { value: 0.0 }, 
    };

    const materialParticles = new RawShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader(),
        fragmentShader: fragmentShader(),
        depthTest: false,
        transparent: true,
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
    scene = new Scene();
    loader = new TextureLoader();
    resize(camera, renderer);
};

const init = (canvas: HTMLCanvasElement) => {
    setup(canvas);
    loader.load(getPathWithPrefix("/images/pixelImage/1.jpg"), start);
};

export default init;
