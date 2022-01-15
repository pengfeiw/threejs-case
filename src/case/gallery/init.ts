import {
    BoxGeometry,
    Mesh,
    Color,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer,
    MeshPhongMaterial,
    DirectionalLight,
    AmbientLight,
    Raycaster,
    TextureLoader,
    LoadingManager,
    MeshBasicMaterial,
    PlaneGeometry
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import AnimatState from "src/engine/animatState/AnimatState";

const init = (canvas: HTMLCanvasElement) => {
    const renderer = new WebGLRenderer({
        antialias: true,
        canvas
    });

    const scene = new Scene();
    scene.background = new Color("black");

    const raycaster = new Raycaster();

    const camera = new PerspectiveCamera(45, 1, 0.1, 10000);
    camera.position.set(0, 0, 0);

    // const orbitControls = new OrbitControls(camera, canvas);
    // orbitControls.update();

    const pos = {x: camera.position.x, y: camera.position.y};
    const animateState = new AnimatState(pos);

    const cubes: Mesh[] = [];

    const createImages = () => {
        const loadManager = new LoadingManager();
        const textureLoader = new TextureLoader(loadManager);

        const materials: MeshBasicMaterial[] = [];
        for (let i = 0; i < 20; i++) {
            materials.push(new MeshBasicMaterial({
                map: textureLoader.load(`/images/gallery/${i + 1}.jpg`)
            }));
        }

        loadManager.onLoad = () => {
            const h = 10, vSpace = 10;
            const row = 5, column = 30;
            const radius = 120;
            const totalH = row * h + (row - 1) * vSpace;
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < column; j++) {
                    const y = -totalH * 0.5 + i * (h + vSpace) + h * 0.5;
                    const radians = Math.PI * 2 / column * j;
                    const x = Math.sin(radians) * radius;
                    const z = Math.cos(radians) * radius;

                    const geo = new PlaneGeometry(h, h);
                    const mat = materials[Math.floor(Math.random() * 20)];

                    const plane = new Mesh(geo, mat);
                    plane.position.set(x, y, z);
                    plane.lookAt(0, y, 0);

                    scene.add(plane);
                }
            }

        };
    };

    const resize = () => {
        const aspect = window.innerWidth / window.innerHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const mousedown = (event: MouseEvent) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera({x, y}, camera);

        const intersects = raycaster.intersectObjects(cubes);

        if (intersects.length > 0) {
            animateState.to({x: intersects[0].object.position.x, y: intersects[0].object.position.y}).onUpdate((obj) => {
                camera.position.x = obj.x;
                camera.position.y = obj.y;

                console.log("camera.position", camera.position.x, camera.position.y);
            }).start();
        }
    }

    const on = () => {
        let isMousedown = false;
        window.addEventListener("mousedown", () => {
            isMousedown = true;
        });

        window.addEventListener("mouseup", () => {
            isMousedown = false;
        });

        window.addEventListener("mousemove", (event: MouseEvent) => {
            if (isMousedown) {
                camera.rotation.y += event.movementX * 0.001;
                camera.updateProjectionMatrix();
            }
        });
    };

    const setup = () => {
        createImages();

        resize();
        window.addEventListener("resize", resize);

        window.addEventListener("mousedown", mousedown);
    };

    const render = (time: number) => {
        renderer.render(scene, camera);
        animateState.update(time);
        requestAnimationFrame(render);
    };

    setup();
    on();
    requestAnimationFrame(render);
};

export default init;
