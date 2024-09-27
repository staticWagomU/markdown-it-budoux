import defu, { type Defu } from "defu";

/**
 * Options for the budoux preprocessor
 * @param language - The default language to translate to (default: `ja`)
 * @param attribute - The attribute to look for to translate (default: `data-budoux`)
 */
export type Options = {
  language?: 'ja' | 'cs' | 'ct' | 'th';
};

export const DEFAULT_OPTIONS = {
  language: 'ja',
} as const satisfies Options;

export function resolveOptions(options: Options): Defu<Options, [typeof DEFAULT_OPTIONS]> {
	return defu(options, DEFAULT_OPTIONS);
}
