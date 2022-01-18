import {PerspectiveCamera, WebGLRenderer} from "three";

export const resize = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};
