import {PerspectiveCamera, Vector3} from "three";
import AnimatState from "./animatState/AnimatState";

class AnimatCamera extends PerspectiveCamera {
    private _inAnimation: boolean = false;
    public get inAnimation() {
        return this._inAnimation;
    }
    private animatState: {
        position: AnimatState;
        lookAt: AnimatState;
    };
    public constructor(fov?: number, aspect?: number, near?: number, far?: number) {
        super(fov, aspect, near, far);
        this.animatState = {
            position: new AnimatState({x: 0, y: 0, z: 0}),
            lookAt: new AnimatState({x: 0, y: 0, z: 0})
        };
    }

    public to(position: Vector3) {
        this.animatState.position.to({x: position.x, y: position.y, z: position.z}).onUpdate((obj) => {
            this.position.x = obj.x;
            this.position.y = obj.y;
            this.position.z = obj.z;
        });
        return this;
    }

    public lookTo(target: Vector3) {
        const vector = new Vector3(0, 0, -1);
        vector.applyQuaternion(this.quaternion);
        const oldTarget = this.position.clone().add(vector);
        this.animatState.lookAt = new AnimatState({x: oldTarget.x, y: oldTarget.y, z: oldTarget.z});
        this.animatState.lookAt.to({x: target.x, y: target.y, z: target.z}).onUpdate((obj) => {
            this.lookAt(new Vector3(obj.x, obj.y, obj.z));
        });

        return this;
    }

    public startAnimation() {
        this.animatState.position?.start();
        this.animatState.lookAt?.start();
    }

    public updateAnimation(time: number) {
        const res1 = this.animatState.position?.update(time);
        const res2 = this.animatState.lookAt?.update(time);

        return res1 || res2;
    }
}

export default AnimatCamera;
