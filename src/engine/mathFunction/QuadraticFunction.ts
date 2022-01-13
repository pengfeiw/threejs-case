import MathFunction from "./MathFunction";
class QuadraticFunction implements MathFunction {
    public a: number;
    public b: number;
    public c: number;
    public constructor(a = 1, b = 0, c = 0) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public getValue(x: number): number {
        return this.a * x * x + this.b * x + this.c; 
    }
}

export default QuadraticFunction;
