import { readFileSync } from 'fs';
import * as path from 'path';
import { getSvg } from '../src/index';
import { pathConstants } from './pathConstants';

const inputDir = path.resolve(__dirname, './outputIcons');

describe('getSvg', () => {
    Object.keys(pathConstants).forEach((file) => {
        const filePath = path.join(inputDir, file);
        const expectedSvg = readFileSync(filePath, 'utf-8').trim();
        const pathD = pathConstants[file];

        test(`should generate correct SVG for ${file}`, () => {
            const result = getSvg(pathD);
            expect(result.trim()).toBe(expectedSvg);
        });
    });

    test('should handle empty paths input', () => {
        const result = getSvg("");
        expect(result.trim()).toBe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"></svg>');
    });

    test('should throw error on invalid input', () => {
        expect(() => getSvg(null as never)).toThrow();
    });
});
