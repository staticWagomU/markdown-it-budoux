import MarkdownIt from "markdown-it";

/**
 * Options for the budoux preprocessor
 * @param language - The default language to translate to (default: `ja`)
 * @param attribute - The attribute to look for to translate (default: `data-budoux`)
 */
type Options = {
	language?: "ja" | "cs" | "ct" | "th";
};

/**
 * apply budoux to markdown-it
 * @param options
 */
declare function markdownItBudoux(options?: Options): (md: MarkdownIt) => void;

export { markdownItBudoux as default };
