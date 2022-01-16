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
import {getPathWithPrefix} from "src/util";

const init = (canvas: HTMLCanvasElement) => {
    const renderer = new WebGLRenderer({
        antialias: true,
        canvas
    });

    const scene = new Scene();
    scene.background = new Color("#092133");

    const raycaster = new Raycaster();

    const camera = new AnimatCamera(45, 1, 0.1, 10000);
    camera.rotation.order = "XZY";
    camera.position.set(0, 0, 0);

    const createImages = () => {
        const loadManager = new LoadingManager();
        const textureLoader = new TextureLoader(loadManager);

        const materials: MeshBasicMaterial[] = [];
        for (let i = 0; i < 20; i++) {
            materials.push(new MeshBasicMaterial({
                map: textureLoader.load(getPathWithPrefix(`/images/gallery/${i + 1}.jpg`))
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
        let selectedId: number | null = null;
        let viewOneTarget = new Vector3();
        let mouseDownNormal = {x: 0, y: 0};
        let prepos = {x: 0, y: 0};

        const getTouchPos = (event: TouchEvent): {x: number; y: number} => {
            return {
                x: event.touches[0].pageX - canvas.offsetLeft,
                y: event.touches[0].pageY - canvas.offsetTop
            }
        };

        const mousedownHandle = (clientX: number, clientY: number) => {
            const x = (clientX / window.innerWidth) * 2 - 1;
            const y = - (clientY / window.innerHeight) * 2 + 1;
            isMousedown = true;

            mouseDownNormal = {x, y};
        };

        const mouseupHandle = () => {
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
        };
        const mousemoveHandle = (movementX: number) => {
            if (isMousedown) {
                isDrag = true;
                if (selectedId === null) {
                    camera.rotation.y += movementX * 0.001;
                }
            }
        };

        window.addEventListener("mousedown", (event: MouseEvent) => {
            event.preventDefault();
            mousedownHandle(event.offsetX, event.offsetY);
        });

        window.addEventListener("mouseup", (event) => {
            event.preventDefault();
            mouseupHandle();
        });

        window.addEventListener("mousemove", (event: MouseEvent) => {
            event.preventDefault();
            mousemoveHandle(event.movementX);
        });


        window.addEventListener("touchstart", (event: TouchEvent) => {
            if (event.cancelable) {
                event.preventDefault();
            }
            const touchPos = getTouchPos(event);
            prepos = {...touchPos};
            mousedownHandle(touchPos.x, touchPos.y);
        });

        window.addEventListener("touchmove", (event) => {
            if (event.cancelable) {
                event.preventDefault();
            }
            const touchPos = getTouchPos(event);
            mousemoveHandle(touchPos.x - prepos.x);
            prepos = {...touchPos};
        });

        window.addEventListener("touchend", (event: TouchEvent) => {
            if (event.cancelable) {
                event.preventDefault();
            }

            mouseupHandle();
        });

        window.addEventListener("resize", resize);
    };

    const setup = () => {
        createImages();

        resize();

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
