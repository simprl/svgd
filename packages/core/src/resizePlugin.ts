import { CustomPlugin } from 'svgo';
import { XastElement, XastRoot } from 'svgo/lib/types';

export interface ViewBox {
    minX: number;
    minY: number;
    width: number;
    height: number;
}

export interface ResizeParams {
    targetViewBox: ViewBox;
    overrideSvgAttributes?: boolean;
    preserveAspectRatio?: boolean;
}

/**
 * Resizes an SVG by wrapping its content in a <g> transform element.
 */
export function resizePlugin(params: ResizeParams): CustomPlugin {
    return {
        name: 'resizePlugin',
        fn: (ast) => {
            const svgNode = getSvgNode(ast);
            if (!svgNode) return null;

            const originalDims = getOriginalDimensions(svgNode);
            const transform = computeTransformations(originalDims, params);
            wrapChildrenInGroup(svgNode, transform);
            overrideSvgAttributesIfNeeded(svgNode, params);

            return null;
        },
    };
}

function getSvgNode(ast: XastRoot): XastElement | undefined {
    return ast.children.find(
        (node) => node.type === 'element' && node.name === 'svg'
    ) as XastElement | undefined;
}

/**
 * Extracts original dimensions from an SVG node.
 */
function getOriginalDimensions(svgNode: XastElement): ViewBox {
    const viewBox = svgNode.attributes.viewBox;

    if (viewBox) {
        const [minX, minY, width, height] = viewBox.split(/[\s,]+/).map(parseFloat);
        return { minX, minY, width, height };
    }

    return {
        minX: 0,
        minY: 0,
        width: parseFloat(svgNode.attributes.width ?? '100'),
        height: parseFloat(svgNode.attributes.height ?? '100'),
    };
}

/**
 * Computes the transformations (translate and scale) for resizing an SVG.
 */
function computeTransformations(originalDims: ViewBox, params: ResizeParams): string {
    const { targetViewBox, preserveAspectRatio = true } = params;
    const { minX: origMinX, minY: origMinY, width: origWidth, height: origHeight } = originalDims;
    const { minX, minY, width, height } = targetViewBox;

    const scaleX = width / origWidth;
    const scaleY = height / origHeight;
    const scale = preserveAspectRatio ? Math.min(scaleX, scaleY) : NaN;

    const translateX =
        minX - origMinX * (preserveAspectRatio ? scale : scaleX) +
        (preserveAspectRatio ? (width - origWidth * scale) / 2 : 0);

    const translateY =
        minY - origMinY * (preserveAspectRatio ? scale : scaleY) +
        (preserveAspectRatio ? (height - origHeight * scale) / 2 : 0);

    if (preserveAspectRatio) {
        return `translate(${translateX}, ${translateY}) scale(${scale}, ${scale})`;
    }
    return `translate(${translateX}, ${translateY}) scale(${scaleX}, ${scaleY})`;
}

/**
 * Wraps the current children of an SVG node in a <g> element
 * with the specified transform attribute.
 */
function wrapChildrenInGroup(svgNode: XastElement, transform: string): void {
    const groupNode: XastElement = {
        type: 'element',
        name: 'g',
        attributes: { transform },
        children: [],
    };

    groupNode.children = svgNode.children.splice(0, svgNode.children.length);
    svgNode.children.push(groupNode);
}

/**
 * Optionally overrides the SVG node attributes with the new viewBox
 * and removes width/height attributes.
 */
function overrideSvgAttributesIfNeeded(svgNode: XastElement, params: ResizeParams): void {
    const { overrideSvgAttributes = true, targetViewBox } = params;
    if (!overrideSvgAttributes) return;

    const { minX, minY, width, height } = targetViewBox;
    svgNode.attributes.viewBox = `${minX} ${minY} ${width} ${height}`;
    delete svgNode.attributes.width;
    delete svgNode.attributes.height;
}
