import {
    Mesh,
    Color,
    Scene,
    Vector3,
    WebGLRenderer,
    Raycaster,
    TextureLoader,
    LoadingManager,
    MeshBasicMaterial,
    PlaneGeometry
} from "three";
import AnimatCamera from "src/engine/AnimatCamera";

const init = (canvas: HTMLCanvasElement) => {
    const renderer = new WebGLRenderer({
        antialias: true,
        canvas
    });

    const scene = new Scene();
    scene.background = new Color("black");

    const raycaster = new Raycaster();

    const camera = new AnimatCamera(45, 1, 0.1, 10000);
    camera.position.set(0, 0, 0);

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
            const h = 10, vSpace = 5;
            const row = 5, column = 30;
            const radius = 80;
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

    const on = () => {
        let isMousedown = false;
        let isDrag = false;
        let mouseDownScreenPos = {x: 0, y: 0};
        let selectedId: number | null = null;
        let viewOneTarget = new Vector3();
        let mouseDownNormal = {x: 0, y: 0};
        window.addEventListener("mousedown", (event: MouseEvent) => {
            isMousedown = true;
            mouseDownScreenPos = {x: event.offsetX, y: event.offsetY};
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = - (event.clientY / window.innerHeight) * 2 + 1;
            mouseDownNormal = {x, y};
        });

        window.addEventListener("mouseup", (event: MouseEvent) => {
            isMousedown = false;
            
            if (!isDrag) {
                raycaster.setFromCamera(mouseDownNormal, camera);
                const intersects = raycaster.intersectObjects(scene.children);
    
                if (intersects.length > 0) {
                    if (selectedId !== intersects[0].object.id) {
                        const p = intersects[0].object.position;
                        viewOneTarget = new Vector3().copy(intersects[0].object.position);
                        const halfP = new Vector3(p.x * 0.8, p.y, p.z * 0.8);
    
                        camera.to(halfP).lookTo(p).startAnimation();
                        selectedId = intersects[0].object.id;
                    }
                }
                if (selectedId !== null && intersects.length === 0) {
                    camera.to(new Vector3(0, 0, 0)).lookTo(new Vector3(viewOneTarget.x, 0, viewOneTarget.z)).startAnimation();
                    selectedId = null;
                }
            }
            isDrag = false;
        });

        window.addEventListener("mousemove", (event: MouseEvent) => {
            if (isMousedown) {
                isDrag = true;
                if (selectedId === null) {
                    camera.rotation.y += event.movementX * 0.001;
                }
            }
        });
    };

    const setup = () => {
        createImages();

        resize();
        window.addEventListener("resize", resize);
    };

    const render = (time: number) => {
        renderer.render(scene, camera);
        camera.updateAnimation(time);
        requestAnimationFrame(render);
    };

    setup();
    on();
    requestAnimationFrame(render);
};

export default init;
