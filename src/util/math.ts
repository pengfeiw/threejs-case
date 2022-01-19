export const clamp = (value: number, min: number, max: number) => {
    value = Math.max(min, value);
    value = Math.min(value, max);

    return value;
};
