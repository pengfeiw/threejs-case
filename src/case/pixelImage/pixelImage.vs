attribute vec3 position;
attribute vec2 offset;
attribute vec2 uv;

uniform vec2 uTextureSize;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vuv;

void main() {
    float width = uTextureSize.x;
    float height = uTextureSize.y;
    vec2 cellSize = vec2(1. / width, 1. / height);

    vuv = (uv.xy + vec2(offset.x, height - offset.y)) * cellSize;

    gl_Position = vec4(offset.x - width * 0.5 + position.x, height * 0.5 - offset.y + position.y, position.z, 1.);
    gl_Position = projectionMatrix * modelViewMatrix * gl_Position;
}
