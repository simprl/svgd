import { defineConfig } from 'tsup'

export default defineConfig({
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
})
