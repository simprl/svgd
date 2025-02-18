import { Config } from 'svgo';
import { ResizeParams } from "./resizePlugin";

export interface SVGDConfig {
    resize: ResizeParams;

    svgo: Config;
}

export const defaultConfig: SVGDConfig = {
    resize: {
        targetViewBox: {
            minX: 0,
            minY: 0,
            width: 24,
            height: 24,
        }
    },
    svgo: {
        plugins: [
            {
                name: 'preset-default',
                params: {
                    overrides: {
                        convertShapeToPath: false,
                        convertColors: false,
                        mergePaths: false,
                        moveElemsAttrsToGroup: false,
                        moveGroupAttrsToElems: false,
                    },
                },
            },
            {
                name: 'convertShapeToPath',
                params: {
                    convertArcs: true,
                },
            },
            {
                name: 'mergePaths',
                params: {
                    force: true,
                },
            },
            {
                name: 'convertColors',
                params: {
                    currentColor: false,
                    names2hex: true,
                    rgb2hex: true,
                    shorthex: true,
                    shortname: false,
                },
            },
            {
                name: 'moveGroupAttrsToElems',
            },
            {
                name: 'collapseGroups',
            },
            {
                name: "convertPathData",
            },
        ],
    }
};
