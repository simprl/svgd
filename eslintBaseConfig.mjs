import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

export const getBaseConfig = (dirname) => {
    const compat = new FlatCompat({
        baseDirectory: dirname,
        recommendedConfig: js.configs.recommended,
        allConfig: js.configs.all
    });
    return [
        ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),
        {
            ignores: ["*", "!src/**"],
        },
        {
            files: ['**/*.ts', '**/*.tsx'],
            languageOptions: {
                globals: {
                    ...globals.browser,
                    ...globals.node,
                },

                parser: tsParser,
                ecmaVersion: "latest",
                sourceType: "module",

                parserOptions: {
                    project: ["./tsconfig.json"],
                    tsconfigRootDir: dirname,
                },
            },

            rules: {},
        },
        {
            "files": ["tests/**/*"],
            "env": {
                "jest": true
            }
        }
    ];
}

