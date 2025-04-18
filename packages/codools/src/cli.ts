#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import { getCodeMD, saveMD } from "codools";

const program = new Command();

program
  .name("codools")
  .description("Generate project code documentation as Markdown")
  .option(
    "-r, --root <path>",
    "Project root directory (defaults to current working directory)",
    "."
  )
  .option(
    "-o, --output <path>",
    "Output file path for generated Markdown (relative to project root)",
    "docs/code.md"
  )
  .action((options) => {
    try {
      // Resolve paths relative to current working directory
      const rootDir = path.resolve(process.cwd(), options.root);
      const outputFile = path.resolve(process.cwd(), options.output);

      // Generate and save Markdown documentation
      const markdown = getCodeMD(rootDir);
      saveMD(outputFile, markdown);
    } catch (error: unknown) {
      console.error("❌ Failed to generate documentation:", error);
      process.exit(1);
    }
  });

program.parse(process.argv);
