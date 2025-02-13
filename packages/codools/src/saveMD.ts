import { dirname } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";

export const saveMD = (filePath: string, content: string) => {
    const docsDir = dirname(filePath);
    if (!existsSync(docsDir)) mkdirSync(docsDir);

    writeFileSync(filePath, content, "utf8");
    console.log(`✅ Saved: ${filePath}`);
};
