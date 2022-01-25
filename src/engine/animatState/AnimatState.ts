import getValue, {AnimatFunc} from "./animtFunction";

export type AnimateObject = Record<string, number>;

const cloneAnimateObject = (obj: AnimateObject) => {
    const a: AnimateObject = {};

    for (let key in obj) {
        a[key] = obj[key];
    }

    return a;
}

class AnimatState {
    private animatFunction: AnimatFunc = "QUADRATIC";
    private _object: AnimateObject;
    private _endState: AnimateObject = {};
    private _startState: AnimateObject = {};
    private _duration = 1000;
    private _onUpdateListener?: (object: AnimateObject) => void;
    private _onEndListener?: (object: AnimateObject) => void;
    private _start = false;
    private _end = false;
    private _startTime = -1;
    private get _endTime() {
        return this._startTime + this._duration;
    }
    public get state() {
        return this._object;
    }
    public get isStart() {
        return this._start;
    }
    public get isEnd() {
        return this._end;
    }
    public constructor(obj: AnimateObject, animatFunc?: AnimatFunc) {
        this._object = obj;
        if (animatFunc) {
            this.animatFunction = animatFunc;
        }
    }

    public onUpdate(listener?: (object: AnimateObject) => void): this {
        this._onUpdateListener = listener;
        return this;
    }

    public onEnd(listener: (object: AnimateObject) => void, clearOnFinish = true): this {
        this._onEndListener = (obj: AnimateObject) => {
            if (clearOnFinish) {
                this._onEndListener = undefined;
            }

            listener(obj);
        };
        return this;
    }

    public to(end: AnimateObject, duration?: number) {
        this._endState = cloneAnimateObject(end);
        this._startState = cloneAnimateObject(this._object);
        if (duration) {
            this._duration = duration;
        }

        this._startTime = -1;
        return this;
    }

    public start() {
        this._start = true;
        this._end = false;
    }

    private stop() {
        this._startTime = -1;
        this._start = false;
        this._end = true;
    }

    public update(time: number = Date.now()) {
        if (!this._start) {
            return false;
        }

        if (this._startTime === -1) {
            this._startTime = time;
            return false;
        }

        if (time >= this._endTime) {

            for (let key in this._endState) {
                this._object[key] = this._endState[key];
            }

            if (this._onUpdateListener) {
                this._onUpdateListener(this._object);
            }

            this.stop();

            if (this._onEndListener) {
                this._onEndListener(this._object);
            }

            return false;
        }

        const elapse = time - this._startTime;

        for (let key in this._object) {
            const startValue = this._startState[key];
            const endValue = this._endState[key];

            const value = getValue(elapse / (this._duration), startValue, endValue, this.animatFunction);

            this._object[key] = value;
        }

        if (this._onUpdateListener) {
            this._onUpdateListener(this._object);
        }

        return true;
    }
}

export default AnimatState;
