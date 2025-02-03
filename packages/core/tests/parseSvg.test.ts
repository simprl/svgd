import { readFileSync } from 'fs';
import * as path from 'path';
import { getSvgoConfig } from '../src/index';
import { optimize } from 'svgo';
import { pathConstants } from './pathConstants';

const inputDir = path.resolve(__dirname, './inputIcons');

describe('parseSvg', () => {
    const svgoConfig = getSvgoConfig();
    Object.keys(pathConstants).forEach((file) => {
        const filePath = path.join(inputDir, file);
        const svgString = readFileSync(filePath, 'utf-8').trim();
        const expectedOutput = pathConstants[file];


        test(`should correctly parse SVG from ${file}`, () => {
            const result = optimize(svgString, svgoConfig).data;
            expect(result).toContain('M');
        });

        test(`should match expected output for ${file}`, () => {
            const result = optimize(svgString, svgoConfig).data;
            expect(result).toBe(expectedOutput);
        });
    });

    test('should handle empty SVG', () => {
        const emptySvg = '<svg></svg>';
        const result = optimize(emptySvg, svgoConfig).data;
        expect(result).toBe('');
    });

    test('should throw error on invalid SVG', () => {
        const invalidSvg = '<svg><path d="M10 10"></svg';
        expect(() => optimize(invalidSvg, svgoConfig).data).toThrow();
    });
});
