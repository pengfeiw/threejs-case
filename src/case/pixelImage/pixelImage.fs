precision highp float;
uniform sampler2D uTexture;

varying vec2 vuv;

void main() {
    gl_FragColor = texture2D(uTexture, vuv);
    // gl_FragColor = vec4(0.89, 0.11, 0.11, 1.0);
}
