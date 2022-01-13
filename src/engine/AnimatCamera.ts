import {PerspectiveCamera, Vector3} from "three";
import AnimatState3 from "./animatState/AnimatState3";

class AnimatCamera extends PerspectiveCamera {
    public animatState: {
        position: AnimatState3;
        target: AnimatState3;
    };

    public constructor(fov?: number, aspect?: number, near?: number, far?: number) {
        super(fov, aspect, near, far);

        this.animatState = {
            position: new AnimatState3(new Vector3(0, 0, 100)),
            target: new AnimatState3(new Vector3())
        };
    }

    public updatePosition() {
        this.position.copy(this.animatState.position.state);
    }

    public updateTarget() {
        this.lookAt(this.animatState.target.state);
    }
}

export default AnimatCamera;
