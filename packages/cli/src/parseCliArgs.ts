import { createCommand, InvalidArgumentError } from 'commander';

/**
 * CLIOptions represent the final parsed arguments from the CLI.
 */
export interface CLIOptions {
    input: string;
    output: string;
    colors?: boolean;
    quote: boolean;
    template: string;
    format: 'camelCase' | 'PascalCase' | 'snake_case' | 'SCREAMING_SNAKE_CASE' | 'material';
    md?: string;
    html?: string;
    dts?: boolean;
    size?: number;
}


function commanderParseInt(value: string): number {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
        throw new InvalidArgumentError('Not a number.');
    }
    return parsedValue;
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
        .option('-c, --colors', 'Keep colors', false)
        .option('-s, --size <number>', 'Icon Size', commanderParseInt, 24)
        .option('-q, --quote', 'Use single quotes in the output', false)
        .option('-t, --template <string>', 'Template string for naming convention', '')
        .option('-m, --md <string>', 'Path to the output MD file', '')
        .option('-h, --html <string>', 'Path to the output HTML file', '')
        .option('-d, --dts', 'Path to the output HTML file', false)
        .option(
            '-f, --format <format>',
            'Naming format: camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, or material',
            'camelCase'
        )
        .parse(argv);

    return program.opts<CLIOptions>();
}
