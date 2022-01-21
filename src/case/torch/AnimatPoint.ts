import {Vector3} from "three";
import AnimatState from "src/engine/animatState/AnimatState";

class AnimatPoint {
    private _position = {x: 0, y: 0, z: 0};
    private _opacity: {value: number};
    private _size: {value: number};

    private _animatState: {
        position: AnimatState;
        opacity: AnimatState;
        size: AnimatState;
    }
    public get position() {
        return this._position;
    }

    public get opacity() {
        return this._opacity;
    }
    public get size() {
        return this._size;
    }
    public get isStart() {
        return this._animatState.position.isStart || this._animatState.opacity.isStart || this._animatState.size.isStart;
    }
    public get isEnd() {
        return this._animatState.position.isEnd && this._animatState.opacity.isEnd && this._animatState.size.isEnd;
    }
    public constructor(pos = new Vector3(), opacity = 1, size = 1) {
        this._opacity = {value: opacity};
        this._position = {x: pos.x, y: pos.y, z: pos.z};
        this._size = {value: size};

        this._animatState = {
            position: new AnimatState(this.position, "LINEAR"),
            opacity: new AnimatState(this._opacity, "LINEAR"),
            size: new AnimatState(this._size, "LINEAR")
        };
    }

    public to(position: Vector3, duration = 1000) {
        this._animatState.position.to({x: position.x, y: position.y, z: position.z}, duration);
        return this;
    }

    public opacityTo(opacity: number, duration = 1000) {
        this._animatState.opacity.to({value: opacity}, duration);
        return this;
    }

    public sizeTo(size: number, duration = 1000) {
        this._animatState.size.to({value: size}, duration);
        return this;
    }

    public startAnimation() {
        this._animatState.position.start();
        this._animatState.opacity.start();
        this._animatState.size.start();
    }

    public updateAnimation(time: number) {
        const res1 = this._animatState.position.update(time);
        const res2 = this._animatState.size.update(time);
        const res3 = this._animatState.opacity.update(time);

        return res1 || res2 || res3;
    }
}

export default AnimatPoint;
