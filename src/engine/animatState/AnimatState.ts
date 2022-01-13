interface AnimatState<T = number> {
    start: T;
    update(t: number): void;
    stop: boolean;
    get state(): number;
}

export default AnimatState;
