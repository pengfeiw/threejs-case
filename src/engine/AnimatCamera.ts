import {PerspectiveCamera, Vector3} from "three";
import AnimatState3 from "./animatState/AnimatState3";

class AnimatCamera extends PerspectiveCamera {
    private _inAnimation: boolean = false;
    public get inAnimation() {
        return this._inAnimation;
    }
    private startTime = 0;
    private animatState: {
        position: {
            active: boolean;
            value: AnimatState3;
        };
        target: {
            active: boolean;
            value: AnimatState3;
        };
    };
    public constructor(fov?: number, aspect?: number, near?: number, far?: number) {
        super(fov, aspect, near, far);

        this.animatState = {
            position: {
                active: false,
                value: new AnimatState3(this.position)
            },
            target: {
                active: false,
                value: new AnimatState3(new Vector3())
            }
        };
    }

    private updatePosition() {
        this.position.copy(this.animatState.position.value.state);
    }

    private updateTarget() {
        this.lookAt(this.animatState.target.value.state);
    }

    public setAnimatPosition(end: Vector3) {
        this.animatState.position.active = true;
        this.animatState.position.value.end.copy(end);
    }

    public setAnimatTarget(end: Vector3) {
        this.animatState.target.active = true;
        this.animatState.target.value.end.copy(end);
    }

    public startAnimation(startTime: number) {
        this.animatState.position.value.start.copy(this.position);
        this._inAnimation = true;
    }

    public endAnimation() {
        this._inAnimation = false;
    }

    public update(time: number) {
        if (this.inAnimation) {
            const t = time - this.startTime;
            this.animatState.position.value.update(t);
            this.animatState.target.value.update(t);

            this.updatePosition();
            this.updateTarget();
        }
    }
}

export default AnimatCamera;
