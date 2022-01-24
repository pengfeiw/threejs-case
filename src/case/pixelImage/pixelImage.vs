attribute vec3 position;
attribute vec2 offset;
attribute vec2 uv;

uniform vec2 uTextureSize;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;

varying vec2 vuv;

float rand(float x) {
    return fract(sin(x) * 100000.0);
}

float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    // return mix(rand(i), rand(i + 1.0), smoothstep(0., 1., f));

    float u = f * f * (3.0 - 2.0 * f ); // custom cubic curve
    return mix(rand(i), rand(i + 1.0), u); // using it in the interpolation
}

void main() {
    float width = uTextureSize.x;
    float height = uTextureSize.y;
    vec2 cellSize = vec2(1. / width, 1. / height);

    vuv = (uv.xy + vec2(offset.x, height - offset.y)) * cellSize;

    gl_Position = vec4(offset.x - width * 0.5, height * 0.5 - offset.y, noise(offset.x * offset.y) * 20. + sin(uTime * offset.x * offset.y * 0.001) * 10., 1.);
    gl_Position = vec4(gl_Position.xy + position.xy * 0.5, gl_Position.z, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * gl_Position;
}
