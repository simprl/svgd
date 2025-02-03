import { commands, PathAttributes } from "./commands";


export function getPaths(d: string): PathAttributes[] {
    const paths: PathAttributes[] = [];
    let attributes: Partial<PathAttributes> = {};

    const pathCommands: string[] = d.split(new RegExp(
        `(${commands.map(cmd => `${cmd.code}${cmd.regexp}`).join('|')})`
    ));
    pathCommands.forEach((text, i) => {
        const isCommand = i % 2 === 1;
        if (isCommand) {
            commands.forEach(({ code, attribute, regexp, toAttribute }) => {
                const match = text.match(new RegExp(`^${code}(${regexp})$`));
                if (match) {
                    attributes[attribute] = toAttribute(match[1]);
                }
            });
            return;
        }
        const d = text.trim();
        if (d) {
            paths.push({ ...attributes, d });
            attributes = {};
        }
    });

    return paths;
}
