import { createCommand } from 'commander';

/**
 * CLIOptions represent the final parsed arguments from the CLI.
 */
export interface CLIOptions {
    input: string;
    output: string;
    quote: boolean;
    template: string;
    format: 'camelCase' | 'PascalCase' | 'snake_case' | 'SCREAMING_SNAKE_CASE';
    md?: string;
    html?: string;
    dts?: boolean;
}

/**
 * parseCliArgs takes the process.argv and parses it using commander.
 * It returns a CLIOptions object with the recognized arguments.
 */
export function parseCliArgs(argv: string[]): CLIOptions {
    const program = createCommand();
    program
        .version('1.0.5')
        .description('CLI tool to generate constants from SVG files')
        .option('-i, --input <directory>', 'Input directory containing SVG files', 'src/assets/icons')
        .option('-o, --output <file>', 'Output file path or pattern', 'src/components/Icon/paths.js')
        .option('-q, --quote', 'Use single quotes in the output', false)
        .option('-t, --template <string>', 'Template string for naming convention', '')
        .option('-m, --md <string>', 'Path to the output MD file', '')
        .option('-h, --html <string>', 'Path to the output HTML file', '')
        .option('-d, --dts <boolean>', 'Path to the output HTML file', false)
        .option(
            '-f, --format <format>',
            'Naming format: camelCase, PascalCase, snake_case, or SCREAMING_SNAKE_CASE',
            'camelCase'
        )
        .parse(argv);

    return program.opts<CLIOptions>();
}
