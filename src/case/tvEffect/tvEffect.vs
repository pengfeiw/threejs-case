attribute vec3 position;
attribute vec2 uv;

uniform vec2 uResolution;

varying vec2 vUv;

void main() {
    vUv = uv;

    // float offsetX = (position.x + 1.) / 2. * uResolution.x;
    // float offsetY = (1. - position.y) / 2. * uResolution.y;
    // vec2 offset = vec2(offsetX, offsetY);
    gl_Position = vec4(position, 1.0);
}
