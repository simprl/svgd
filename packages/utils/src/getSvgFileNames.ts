import { readdirSync } from "fs";
import path from "path";

export function getSvgFileNames(dir: string): string[] {
    const entries = readdirSync(path.resolve(dir), { withFileTypes: true, recursive: true });
    return entries
        .filter((entry) => /\.(svg)$/i.test(entry.name) && !entry.isDirectory())
        .map(({ name, parentPath }) => path.join(parentPath, name))
}
