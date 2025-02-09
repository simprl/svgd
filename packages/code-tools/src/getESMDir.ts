import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

export const getESMDir = (importMetaUrl: string, relativePath?: string) => {
    const root = dirname(fileURLToPath(importMetaUrl));
    return relativePath ? resolve(root, relativePath) : root;
};
