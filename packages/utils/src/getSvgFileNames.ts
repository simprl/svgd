import { readdirSync } from "fs";
import { resolve, join } from "path";

export function getSvgFileNames(dir: string): string[] {
    const entries = readdirSync(resolve(dir), { withFileTypes: true, recursive: true });
    return entries
        .filter((entry) => /\.(svg)$/i.test(entry.name) && !entry.isDirectory())
        .map(({ name, parentPath }) => join(parentPath, name))
}
