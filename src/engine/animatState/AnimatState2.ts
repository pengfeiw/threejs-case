import AnimatState from "./AnimatState";
import {Vector2} from "three";
import MathFunction from "../mathFunction/MathFunction";
import LinearFunction from "../mathFunction/LinearFunction";

class AnimatState2 implements AnimatState<Vector2> {
    public start: Vector2;
    public end: Vector2;
    public stopAtEnd = true;
    public stop: boolean = false;
    public _state: Vector2;
    public get state(): number {
        return this.state;
    }
    public mathFun: MathFunction = new LinearFunction();
    public constructor(start = new Vector2(0, 0), end = new Vector2(1, 1)) {
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
