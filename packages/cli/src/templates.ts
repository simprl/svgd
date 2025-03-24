export interface TemplateProps {
    quote: string;
    filePath: string;
    relativePath: string;
    ts: boolean;
    name: string;
    d: string;
    image: string;
    svg: string;
}

export const jsRowTemplate = ({name, d, quote}: TemplateProps) =>
`export const ${name} = ${quote}${d}${quote};
`;

export const jsRowTemplateWithJSDoc = ({name, d, image, quote, filePath, ts}: TemplateProps) =>
`/**
 * @filepath ${filePath}
 * @return ${image}
 */
export const ${name} = ${quote}${d}${quote}${ts ? ` as "${name}"` : ''};
`;

export const dtsRowTemplate = ({name, image, filePath}: TemplateProps) =>
`/**
 * @filepath ${filePath}
 * @return ${image}
 */
export const ${name}: "${name}";
`;

export const mdRowTemplate = ({name, filePath, relativePath}: TemplateProps) =>
    `|  ![](${relativePath}) | ${name} | ${filePath} |`;

export const mdFileTemplate = (rows: string) => `# List of icons
| Source | Name | Path |
|---|---|---|
${rows}
`;

export const htmlRowTemplate = ({name, filePath, svg}: TemplateProps) =>
    `<tr><td>${svg}</td><td>${name}</td><td>${filePath}</td></tr>`;

export const htmlFileTemplate = (rows: string) => `<!DOCTYPE html>
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

${rows}

        </table>
    </body>
</html>
`;
