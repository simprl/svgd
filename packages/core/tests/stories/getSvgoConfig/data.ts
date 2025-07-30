import { SVGDConfig } from "@svgo/core";

export const config: Partial<SVGDConfig> | undefined = {
    colors: true
}

export const svgInput: string = `
<svg id="a" width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.b{fill:#00ff00;}</style></defs>
    <defs>
        <filter filterUnits="objectBoundingBox" height="102.3%" id="ignoredDef" width="102.3%" x="-1.2%" y="-1.2%">
            <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2"></feGaussianBlur>
            <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1"
                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>
            <feMerge>
                <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
    </defs>
    <g filter="url(#ignoredDef)" opacity="0.8">
        <circle class="b" cx="50" cy="50" r="40" opacity="0.8"/>
    </g>
    <rect x="10" y="10" width="30" height="30" fill="#0000ff" stroke="#ff00ff" opacity="0.8" fill-opacity="0.5" stroke-opacity="0.3"/>
    <line x1="10" y1="80" x2="90" y2="80" stroke="#ff00ff" stroke-width="2"/>
    <polygon points="50,10 90,90 10,90" fill="#ffff00"/>
    <ellipse transform="scale(.24)" cx="50" cy="50" rx="30" ry="20" fill="#ff9900"/>
</svg>`;
