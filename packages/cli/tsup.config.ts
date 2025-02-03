import { defineConfig, Options } from 'tsup'

const baseConfig: Options = {
    splitting: false,
    clean: true,
}

export default defineConfig([
    {
        entry: ['src/cli.ts'],
        outDir: 'dist',
        ...baseConfig,
        format: ["esm"]
    },
    {
        entry: ['src/index.ts'],
        outDir: 'dist',
        dts: true,
        ...baseConfig,
        format: ["esm", "cjs"]
    }
]);
