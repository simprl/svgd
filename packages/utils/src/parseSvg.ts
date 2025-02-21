import { type Config, optimize } from 'svgo';
import { getSvgoConfig } from '@svgd/core';

let defSVGOConfig: Config;

export const parseSVG = (svg: string, svgoConfig?: Config) => {
    if (svgoConfig) {
        return optimize(svg, svgoConfig);
    }

    if (!defSVGOConfig) {
        defSVGOConfig = getSvgoConfig();
    }
    return optimize(svg, defSVGOConfig);
};
