
import {LinearFunction, QuadraticFunction} from "../mathFunction";
export type AnimatFunc = "LINEAR" | "QUADRATIC";

/**
 * 获取值
 * @param et 消耗的时间比，应该为 0 - 1 之间的数字
 * @param start 开始范围
 * @param end 终点范围
 */
const getValue = (et: number, start = 0, end = 1, func: AnimatFunc = "LINEAR") => {
    switch (func) {
        case "LINEAR":
            return getValueByLinear(et, start, end);
        case "QUADRATIC":
            return getValueByQuadratic(et, start, end);
        default:
            return 0;
    }
};

const getValueByLinear = (et: number, start = 0, end = 1) => {
    const linear = new LinearFunction();
    const startValue = linear.getValue(0);
    const endValue = linear.getValue(1);

    let value = linear.getValue(et);
    value = value / (endValue - startValue) * (end - start) + start;

    return value;
};

const getValueByQuadratic = (et: number, start = 0, end = 1) => {
    const quadratic = new QuadraticFunction();

    const startValue = quadratic.getValue(0);
    const endValue = quadratic.getValue(1);

    let value = quadratic.getValue(et);
    value = value / (endValue - startValue) * (end - start) + start;

    return value;
};

export default getValue;
