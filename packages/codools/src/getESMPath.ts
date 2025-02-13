import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

export interface ImportMeta {
    url: string;
}

export const getESMPath = (meta: ImportMeta, relativePath?: string) => {
    const root = dirname(fileURLToPath(meta.url));
    return relativePath ? resolve(root, relativePath) : root;
};
