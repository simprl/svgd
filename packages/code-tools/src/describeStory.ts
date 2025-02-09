import { test, expect, vi } from "vitest";
import { Story } from "src/types";

export const describeStories = <Input extends Record<string, unknown>, Output extends Record<string, unknown>>(stories: Story<Input, Output>[]) => {
    stories.forEach((story, i) => {
        const title = ("title" in story) ? String(story.title) : `Test Case ${i}`;
        test(title, async () => {
            vi.doMock(`${story.dir}/data`, () => story.input);
            if (story.isThrow) {
                await expect(import(`${story.dir}/story`)).rejects.toThrow();
            } else {
                const output = await import(`${story.dir}/story?update=${Date.now()}`);

                Object.entries(story.output).forEach(([key, value]) => {
                    expect(output[key]).toEqual(value);
                })
            }
        });
    });
};
