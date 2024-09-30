import defu from "defu";
import * as budoux from "budoux";

const DEFAULT_OPTIONS = {
	language: "ja",
};
function resolveOptions(options) {
	return defu(options, DEFAULT_OPTIONS);
}

const parserCache = {};
function getParser(language) {
	switch (language) {
		case "ja":
			return (
				parserCache.ja ??
				(parserCache.ja = budoux.loadDefaultJapaneseParser())
			);
		case "cs":
			return (
				parserCache.cs ??
				(parserCache.cs = budoux.loadDefaultSimplifiedChineseParser())
			);
		case "ct":
			return (
				parserCache.ct ??
				(parserCache.ct = budoux.loadDefaultTraditionalChineseParser())
			);
		case "th":
			return (
				parserCache.th ??
				(parserCache.th = budoux.loadDefaultThaiParser())
			);
		default:
			throw new Error(`Language ${language} is not supported`);
	}
}

const WORD_BREAK_STYLE = "word-break:keep-all;overflow-wrap:anywhere;";
const ZERO_WIDTH_SPACE = "\u200B";
function markdownItBudoux(options = {}) {
	const resolvedOptions = resolveOptions(options);
	const parser = getParser(resolvedOptions.language);
	return (md) => {
		const originalRules = {
			paragraph_open: md.renderer.rules.paragraph_open || defaultRender,
			text: md.renderer.rules.text || defaultRender,
		};
		function defaultRender(tokens, idx, options2, _, self) {
			return self.renderToken(tokens, idx, options2);
		}
		md.renderer.rules.paragraph_open = function (
			tokens,
			idx,
			options2,
			env,
			self,
		) {
			const token = tokens[idx];
			const original_style = token.attrGet("style");
			let style =
				original_style &&
				original_style[original_style.length - 1] !== ";"
					? original_style + ";"
					: original_style || "";
			token.attrSet("style", style + WORD_BREAK_STYLE);
			return originalRules.paragraph_open(
				tokens,
				idx,
				options2,
				env,
				self,
			);
		};
		md.renderer.rules.text = function (tokens, idx, options2, env, self) {
			const processedText = parser.parse(tokens[idx].content);
			tokens[idx].content = processedText.join(ZERO_WIDTH_SPACE);
			return originalRules.text(tokens, idx, options2, env, self);
		};
	};
}

export { markdownItBudoux as default };
