import type * as input from "./data";
import type * as output from "./story";
import { useStory, getESMPath } from "codools";

const story = useStory<typeof input, typeof output>({ dir: getESMPath(import.meta) });

const jsRow = `export const icon = "M0,0 L10,10";
`;

const jsRowWithJSDoc = `/**
 * @filepath icons/icon.svg
 * @var ![](data:image/png;base64,ABC)
 */
export const icon = "M0,0 L10,10";
`;

export const dtsRow = `/**
 * @filepath icons/icon.svg
 * @var ![](data:image/png;base64,ABC)
 */
export const icon: string;
`;

export const mdRow = `|  ![](./icon.svg) | icon | icons/icon.svg |`;

export const mdFile = `# List of icons
| Source | Name | Path |
|---|---|---|
|  ![](./icon.svg) | icon | icons/icon.svg |
`;

export const htmlRow = `<tr><td><svg></svg></td><td>icon</td><td>icons/icon.svg</td></tr>`;

export const htmlFile = `<!DOCTYPE html>
<html lang="">
    <head>
        <style>
            table {
                border-collapse: collapse;
            }
            th {
                text-align: center;
                border: 1px solid darkgray;
                padding: 4px 8px;
            }
            td {
                text-align: left;
                border: 1px solid darkgray;
                padding: 4px 8px;
            }
        </style>
    </head>
    <body>
        <table>
            <tr><th>Icon</th><th>Name</th><th>Path</th></tr>

<tr><td><svg></svg></td><td>icon</td><td>icons/icon.svg</td></tr>

        </table>
    </body>
</html>
`;

const mocks = [
  {
    title: "Template functions produce expected output",
    templateProps: {
      quote: '"',
      filePath: "icons/icon.svg",
      relativePath: "./icon.svg",
      name: "icon",
      d: "M0,0 L10,10",
      image: "![](data:image/png;base64,ABC)",
      svg: `<svg></svg>`,
    },
    jsRow,
    jsRowWithJSDoc,
    dtsRow,
    mdRow,
    mdFile,
    htmlRow,
    htmlFile,
  }
];

export const stories = story.getStories({
  mocks,
  input: ({ templateProps }) => ({
    templateProps
  }),
  output: ({ templateProps, title, ...other }) => other
});
