import {AdditiveBlending, BufferAttribute, BufferGeometry, IUniform, Points as ThreePoints, ShaderMaterial} from "three";

class Points extends ThreePoints<BufferGeometry, ShaderMaterial> {
    public constructor(vs: string, fs: string, transparent = false, depthWrite = false) {
        super();
        this.geometry = new BufferGeometry();
        this.material = new ShaderMaterial({
            vertexShader: vs,
            fragmentShader: fs,
            blending: AdditiveBlending,
            depthWrite,
            transparent
        });
    }
    public setAttributes(name: string, value: BufferAttribute) {
        this.geometry.setAttribute(name, value);
    }
    public setUniforms(name: string, value: IUniform) {
        this.material.uniforms[name] = value;
    }
}

export default Points;
