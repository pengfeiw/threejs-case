precision highp float;
uniform sampler2D uTexture;

varying vec2 vuv;

void main() {
    gl_FragColor = texture2D(uTexture, vuv);
}
