import { defineConfig } from 'tsup'

export default defineConfig([
    {
        entry: ['src/cli.ts'],
        outDir: 'dist',
        splitting: false,
        clean: true,
        format: ["esm"]
    },
    {
        entry: {
            index: 'src/index.ts',
            tests: 'src/tests.ts',
        },
        splitting: true,
        sourcemap: true,
        clean: true,
        outDir: "dist",
        dts: true,
        format: ["cjs", "esm"]
    }
])
