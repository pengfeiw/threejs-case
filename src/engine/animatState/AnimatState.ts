interface AnimatState<T = number> {
    start: T;
    update(t: number): void;
    stop: boolean;
    get state(): T;
}

export default AnimatState;
