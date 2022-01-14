import type {NextPage} from "next";
import {useEffect, useRef} from "react";
import {BoxGeometry, Mesh, Color, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer, MeshPhongMaterial, DirectionalLight, AmbientLight, Raycaster} from "three";
import AnimatState from "../engine/animatState/AnimatState";

const init = (canvas: HTMLCanvasElement) => {
    const renderer = new WebGLRenderer({
        antialias: true,
        canvas
    });

    const scene = new Scene();
    scene.background = new Color("black");

    const raycaster = new Raycaster();

    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 100);

    const pos = {x: camera.position.x, y: camera.position.y};
    const animateState = new AnimatState(pos);

    const cubes: Mesh[] = [];

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

    const setup = () => {
        const cubePoses = [
            new Vector3(-15, 15, 0),
            new Vector3(15, 15, 0),
            new Vector3(-15, -15, 0),
            new Vector3(15, -15, 0)
        ];

        const colors = ["#f25020", "#7eba00", "#00a4ef", "#ffba00"];

        for (let i = 0; i < cubePoses.length; i++) {
            const geo = new BoxGeometry(10, 10, 10);
            const mat = new MeshPhongMaterial({
                color: colors[i]
            });

            const cube = new Mesh(geo, mat);
            cube.position.copy(cubePoses[i]);

            cubes.push(cube);

            scene.add(cube);
        }

        const light = new DirectionalLight("white", 1);
        light.position.set(1, 1, 1);
        scene.add(light);

        const ambient = new AmbientLight("white", 0.5);
        scene.add(ambient);

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
    requestAnimationFrame(render);
};

const Home: NextPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        if (canvas) {
            init(canvas);
        }
    }, [canvasRef]);

    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default Home
