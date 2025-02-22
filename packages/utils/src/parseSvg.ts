import { type Config, optimize } from 'svgo';
import { getSvgoConfig } from '@svgd/core';

let defSVGOConfig: Config;

export const parseSvg = (svg: string, svgoConfig?: Config): string => {
    if (svgoConfig) {
        return optimize(svg, svgoConfig).data;
    }

    if (!defSVGOConfig) {
        defSVGOConfig = getSvgoConfig();
    }
    return optimize(svg, defSVGOConfig).data;
};
