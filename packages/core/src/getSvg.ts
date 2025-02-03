import { getPaths } from "./getPaths";
import type { ViewBox } from "./resizePlugin";

export function getSvg(d: string, viewbox?: ViewBox): string {
    const svgParts = getPaths(d).map((attributes) => (
        `<path ${attributes ? Object.entries(attributes).map(([k, v]) => `${k}="${v}"`).join(' ') : ''} />`
    ));
    const { minX = 0, minY = 0, width = 24, height = 24 } = viewbox ?? {};
    const content = svgParts.length ? `
  ${svgParts.join(`
  `)}
` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${width} ${height}" width="${width}" height="${height}">${content}</svg>`;
}
