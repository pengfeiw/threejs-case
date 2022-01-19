import {Object3D, Vector3} from "three";
import AnimatState from "./animatState/AnimatState";

interface AnimatObject {
    inAnimation(): boolean;
    to(pos: Vector3): this;
    start(): void;
    updateAnimation(time: number): boolean;
}

const makeAnimatObject = <T extends Object3D>(obj: T) => {
    let __inAnimation = false;
    let _start = false;
    const newObj = obj as (AnimatObject & T);
    const animatPosition = new AnimatState({x: 0, y: 0, z: 0});

    Object.defineProperty(newObj, "inAnimation", {
        get: function () {return __inAnimation}
    });

    newObj.to = function (pos: Vector3) {
        animatPosition.to({x: pos.x, y: pos.y, z: pos.z}).onUpdate((obj) => {
            newObj.position.x = obj.x;
            newObj.position.y = obj.y;
            newObj.position.z = obj.z;
        });
        return newObj;
    };

    newObj.start = () => {
        _start = true;
    };

    newObj.updateAnimation = (time: number) => {
        return animatPosition.update(time);
    };

    return newObj;
};


export default makeAnimatObject;
