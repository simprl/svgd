import { resolve } from "path";
import { readFileSync } from "fs";
import { Story } from "src/types";
import { transformImports } from "src/transformer";

type ParsedStory = {
    isThrow: false;
    title: string;
    code: string;
    output: Record<string, unknown>;
} | {
    isThrow: true;
    title: string;
    code: string;
    output: undefined;
}
interface ParsedStories {
    title: string;
    stories: ParsedStory[];
}

const getMD = (stories: ParsedStories): string => {
    let md = `## ${stories.title}\n\n`;

    stories.stories.forEach(({ title, code, output, isThrow }, i) => {
        md += `### Use Case ${i + 1}. ${title}\n\n`;
        md += "#### Code:\n";
        md += "```ts\n" + code + "\n```\n\n";
        md += "#### Result:\n";
        md += isThrow ? "`Throw Error`" : "```json\n" + JSON.stringify(output, null, 2) + "\n```\n\n";
    });

    return md;
};

const getStories = <Input extends Record<string, unknown>, Output extends Record<string, unknown>>(stories: Story<Input, Output>[]) => {
    return stories.map(({ dir, title, input, output, isThrow }, i) => {
        const storyFilePath = resolve(dir, `story.ts`);
        const code = readFileSync(storyFilePath, "utf8");
        const definedTitle = title ?? `Test Case ${i}`;
        const transformedCode = transformImports(storyFilePath, code, input);
        const useCase: ParsedStory = isThrow ? {
            title: definedTitle,
            code: transformedCode,
            output: undefined,
            isThrow: true,
        } : {
            title: definedTitle,
            code: transformedCode,
            output,
            isThrow: false,
        };
        return useCase;
    });
};

interface GetStoriesMDProps <Input extends Record<string, unknown>, Output extends Record<string, unknown>>{
    title: string;
    stories: Story<Input, Output>[];
}

export const getStoriesMD = <Input extends Record<string, unknown>, Output extends Record<string, unknown>>({ title, stories }: GetStoriesMDProps<Input, Output>) => (
    getMD({ title, stories: getStories(stories) })
)

