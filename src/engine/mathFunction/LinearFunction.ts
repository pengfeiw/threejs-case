import MathFunction from "./MathFunction";
class LinearFunction implements MathFunction{
    public a;
    public b;
    public constructor(a = 1, b = 0) {
        this.a = a;
        this.b = b;
    }
    public getValue(x: number) {
        return this.a * x + this.b;
    }
}

export default LinearFunction;
