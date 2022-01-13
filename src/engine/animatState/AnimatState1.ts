import LinearFunction from "../mathFunction/LinearFunction";
import MathFunction from "../mathFunction/MathFunction";
import AnimatState from "./AnimatState";

class AnimatState1 implements AnimatState<number> {
    public start: number;
    public end?: number;
    public stop: boolean = false;
    private _state: number;
    public get state() {
        return this._state;
    }
    public mathFun: MathFunction = new LinearFunction();
    public constructor(start = 0, end?: number) {
        this.start = start;
        this._state = start;
        this.end = end;
    }
    public update(t: number) {
        if (this.stop) {
            return;
        }
        
        const change = this.mathFun.getValue(t);

        let value = this.start + change;

        if (this.end && value >= this.end ) {
            value = this.end;
            this.stop = true;
        }

        this._state = value;
    }
}

export default AnimatState1;
