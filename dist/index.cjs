"use strict";

const defu = require("defu");
const budoux = require("budoux");

function _interopDefaultCompat(e) {
	return e && typeof e === "object" && "default" in e ? e.default : e;
}

function _interopNamespaceCompat(e) {
	if (e && typeof e === "object" && "default" in e) return e;
	const n = Object.create(null);
	if (e) {
		for (const k in e) {
			n[k] = e[k];
		}
	}
	n.default = e;
	return n;
}

const defu__default = /*#__PURE__*/ _interopDefaultCompat(defu);
const budoux__namespace = /*#__PURE__*/ _interopNamespaceCompat(budoux);

const DEFAULT_OPTIONS = {
	language: "ja",
};
function resolveOptions(options) {
	return defu__default(options, DEFAULT_OPTIONS);
}

const parserCache = {};
function getParser(language) {
	switch (language) {
		case "ja":
			return (
				parserCache.ja ??
				(parserCache.ja = budoux__namespace.loadDefaultJapaneseParser())
			);
		case "cs":
			return (
				parserCache.cs ??
				(parserCache.cs =
					budoux__namespace.loadDefaultSimplifiedChineseParser())
			);
		case "ct":
			return (
				parserCache.ct ??
				(parserCache.ct =
					budoux__namespace.loadDefaultTraditionalChineseParser())
			);
		case "th":
			return (
				parserCache.th ??
				(parserCache.th = budoux__namespace.loadDefaultThaiParser())
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

module.exports = markdownItBudoux;
