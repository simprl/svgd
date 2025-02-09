import { resolve } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";

export const saveMD = (fileName: string, content: string) => {
    const docsDir = resolve("docs");
    if (!existsSync(docsDir)) mkdirSync(docsDir);

    const filePath = resolve(docsDir, fileName);
    writeFileSync(filePath, content, "utf8");
    console.log(`✅ Saved: ${filePath}`);
};
