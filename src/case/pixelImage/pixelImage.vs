#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

attribute vec3 position;
attribute vec2 offset;
attribute vec2 uv;

uniform vec2 uTextureSize;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uThick;

varying vec2 vuv;

void main() {
    float width = uTextureSize.x;
    float height = uTextureSize.y;
    vec2 cellSize = vec2(1. / width, 1. / height);

    vuv = (uv.xy + vec2(offset.x, height - offset.y)) * cellSize;

    vec2 dist1 = offset - vec2(width * 0.25, height * 0.25);
    vec2 dist2 = offset - vec2(width * 0.25, height * 0.75);
    vec2 dist3 = offset - vec2(width * 0.75, height * 0.25);
    vec2 dist4 = offset - vec2(width * 0.75, height * 0.75);
    vec2 dist = dist1 + dist2 + dist3 + dist4;

    float x = offset.x - width * 0.5;
    float y = height * 0.5 - offset.y;
    float z = snoise2(offset + abs(sin(uTime * 0.0001)) * 0.5) * uThick * dot(dist, dist) * 0.00005;
    gl_Position = vec4(x, y, z, 1.);
    gl_Position = vec4(gl_Position.xy + position.xy * 0.5, gl_Position.z, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * gl_Position;
}
