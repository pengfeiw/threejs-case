uniform sampler2D pointTexture;
uniform vec3 color;

varying float vOpacity;

void main() {
    gl_FragColor = vec4(color, vOpacity);
    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
}
