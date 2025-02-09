
export type Story<Input, Output> = {
    input: Input;
    isThrow: false;
    output: Output;
    title: string;
    dir: string;
} | {
    input: Input;
    isThrow: true;
    output?: undefined;
    title: string;
    dir: string;
}
