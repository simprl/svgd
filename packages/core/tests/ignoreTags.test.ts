import { describe, it, expect, vi } from 'vitest';
import { getSvgoConfig, defaultConfig } from '../src';
import { optimize } from 'svgo';

const svgWithDefs = `<svg xmlns="http://www.w3.org/2000/svg"><defs><filter id="f"/></defs><path filter="url(#f)" d="M0 0"/></svg>`;

describe('ignoreTagsInResult', () => {
  it('throws error when ignore list is empty', () => {
    const cfg = getSvgoConfig({
      ...defaultConfig,
      ignoreTagsInResult: [],
      svgo: { plugins: [] },
    });
    expect(() => optimize(svgWithDefs, cfg)).toThrow('[SVGD ERROR]');
  });

  it('logs info when tag is ignored', () => {
    const cfg = getSvgoConfig({
      ...defaultConfig,
      ignoreTagsInResult: ['defs'],
      svgo: { plugins: [] },
    });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const result = optimize(svgWithDefs, cfg).data.trim();
    expect(result).toBe('M0 0');
    expect(logSpy).toHaveBeenCalledOnce();
    const message = logSpy.mock.calls[0][0];
    expect(message).toContain('<defs');
    logSpy.mockRestore();
  });
});
