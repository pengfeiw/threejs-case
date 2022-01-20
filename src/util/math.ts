import {Vector3} from "three";

export const clamp = (value: number, min: number, max: number) => {
    value = Math.max(min, value);
    value = Math.min(value, max);

    return value;
};

export const randomInt = (min: number, max: number) => {
    const minInt = Math.floor(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
};

export const radian2Degree = (radian: number) => radian / Math.PI * 180;

export const degree2Radian = (degree: number) => degree / 180 * Math.PI;

export const spherical2Cartesian = (rad1: number, rad2: number, radius: number) => {
    const y = Math.sin(rad2) * radius;
    const hl = Math.cos(rad2) * radius;
    const x = Math.cos(rad1) * hl;
    const z = Math.sin(rad1) * hl;

    return new Vector3(x, y, z);
};
