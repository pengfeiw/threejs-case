import AnimatState from "./AnimatState";
import {Vector3} from "three";
import MathFunction from "../mathFunction/MathFunction";
import LinearFunction from "../mathFunction/LinearFunction";

class AnimatState2 implements AnimatState<Vector3> {
    public start: Vector3;
    public end: Vector3;
    public stopAtEnd = true;
    public stop: boolean = false;
    public _state: Vector3;
    public get state(): number {
        return this.state;
    }
    public mathFun: MathFunction = new LinearFunction();
    public constructor(start = new Vector3(0, 0), end = new Vector3(1, 1)) {
        this.start = start;
        this._state = start.clone();
        this.end = end;
    }

    public update(t: number): void {
        if (this.stop) {
            return;
        }

        const delta = this.end.clone().sub(this.start);
        delta.normalize();
        let changeScalar = this.mathFun.getValue(t);
        delta.multiplyScalar(changeScalar);

        this._state.add(delta);

        if (this.stopAtEnd && this._state.distanceTo(this.start) > this.end.distanceTo(this.start)) {
            this.stop = true;
            this._state = this.end.clone();
        }
    }
}

export default AnimatState2;
