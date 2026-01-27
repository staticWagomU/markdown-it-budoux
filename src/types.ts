import type MarkdownIt from "markdown-it";
import type { Renderer, Token } from "markdown-it";
import type { SUPPORTED_ELEMENTS, SUPPORTED_LANGUAGES } from "./constants";

/**
 * 対応言語の型
 */
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * スタイル適用対象要素の型
 */
export type ElementType = (typeof SUPPORTED_ELEMENTS)[number];

/**
 * スタイル適用方式
 */
export type StyleMode = "inline" | "class";

/**
 * markdown-it のレンダラールール関数の型
 */
export type RenderRule = (
	tokens: Token[],
	idx: number,
	options: MarkdownIt.Options,
	env: unknown,
	self: Renderer,
) => string;

/**
 * markdown-it プラグイン関数の型
 */
export type PluginFunction = (md: MarkdownIt) => void;
