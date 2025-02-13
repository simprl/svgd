import { Story } from "src/types";

interface UseStoryProps {
    dir: string;
}

interface DefMock {
    title?: string;
    isThrow?: boolean;
}

interface DescribeProps <Input extends Record<string, unknown>, Output extends Record<string, unknown>, Mock>{
    mocks: Mock[];
    input: (mock: Mock) => Input;
    output: (mock: Mock) => Output;
}

export interface UseStory <Input extends Record<string, unknown>, Output extends Record<string, unknown>>{
    getStories: <Mock extends DefMock>(props: DescribeProps<Input, Output, Mock>) => Story<Input, Output>[];
}

export const useStory = <
    Input extends Record<string, unknown>,
    Output extends Record<string, unknown>
>({ dir }: UseStoryProps): UseStory<Input, Output> => {
    return {
        getStories: ({ mocks, input, output }) => (
            mocks.map((mock, i) => mock?.isThrow ? ({
                isThrow: true,
                input: input(mock),
                output: undefined,
                title: mock?.title ?? String(i),
                dir
            }) : ({
                isThrow: false,
                input: input(mock),
                output: output(mock),
                title: mock?.title ?? String(i),
                dir
            }))
        ),
    };
}
