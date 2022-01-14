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
    private animatFunction: AnimatFunc = "LINEAR";
    private _object: AnimateObject;
    private _endState: AnimateObject = {};
    private _startState: AnimateObject = {};
    private _duration = 1000;
    private _onUpdateListener?: (object: AnimateObject) => void;
    private _isReverse = false;
    private _isStart = false;
    private _isRepeat = false;
    private startTime = 0;
    private _pauseStart = -1;
    private _paused = false;
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
    public to(end: AnimateObject, duration?: number, repeat?: boolean, reverse?: boolean): this {
        this._endState = cloneAnimateObject(end);

        if (duration) {
            this._duration = duration;
        }

        if (repeat) {
            this._isRepeat = repeat;
        }

        if (reverse) {
            this._isReverse = reverse;
        }

        return this;
    }

    public start(time: number = Date.now()) {
        if (this._isStart) return;
        this._isStart = true;

        this._startState = cloneAnimateObject(this._object);

        this.startTime = time;
    }

    public update(time: number = Date.now(), autoStart = true) {
        if (!this._isStart && autoStart) {
            this.start(time);
        }

        if (this._paused) return true;

        const startTime = this.startTime;
        const endTime = startTime + this._duration;

        const elapse = time - this.startTime;

        if (elapse >= endTime) {
            for (let key in this._endState) {
                this._object[key] = this._endState[key];
            }

            if (!this._isRepeat) {
                return false;
            }

            if (this._isReverse) {
                const startState = this._startState;
                this._startState = this._endState;
                this._endState = startState;
            }

            if (this._onUpdateListener) {
                this._onUpdateListener(this._object);
            }

            this.start(time);

            return true;
        }

        for (let key in this._object) {
            const startValue = this._startState[key];
            const endValue = this._endState[key];

            if (startValue && endValue) {
                const value = getValue(elapse / (this._duration), startValue, endValue, this.animatFunction);

                this._object[key] = value;
            }
        }

        if (this._onUpdateListener) {
            this._onUpdateListener(this._object);
        }

        return true;
    }

    public pause(time: number = Date.now()) {
        this._pauseStart = time;
        this._paused = true;
    }

    public resume(time: number = Date.now()) {
        this.startTime += time - this._pauseStart;
        this._pauseStart = -1;
        this._paused = false;
    }
}

export default AnimatState;
