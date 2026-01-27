import type MarkdownIt from "markdown-it";
import type { Renderer, Token } from "markdown-it";
import {
	applyStyleAttribute,
	generateStyleAttribute,
	type StyleAttribute,
} from "../core/style";
import { ELEMENT_TOKEN_MAP } from "../constants";
import type { ResolvedOptions } from "../options";
import type { ElementType, RenderRule } from "../types";

/**
 * デフォルトのレンダラールール
 */
function defaultRender(
	tokens: Token[],
	idx: number,
	options: MarkdownIt.Options,
	_env: unknown,
	self: Renderer,
): string {
	return self.renderToken(tokens, idx, options);
}

/**
 * 指定されたトークンタイプのルールを拡張する
 *
 * @param md - MarkdownItインスタンス
 * @param tokenType - トークンタイプ（例: 'paragraph_open'）
 * @param styleAttr - 適用するスタイル属性
 */
function extendTokenRule(
	md: MarkdownIt,
	tokenType: string,
	styleAttr: StyleAttribute,
): void {
	const originalRule: RenderRule =
		md.renderer.rules[tokenType] || defaultRender;

	md.renderer.rules[tokenType] = function (
		tokens: Token[],
		idx: number,
		mdOptions: MarkdownIt.Options,
		env: unknown,
		self: Renderer,
	): string {
		const token = tokens[idx];
		const existingValue = token.attrGet(styleAttr.name);
		const newValue = applyStyleAttribute(existingValue, styleAttr);
		token.attrSet(styleAttr.name, newValue);

		return originalRule(tokens, idx, mdOptions, env, self);
	};
}

/**
 * ブロック要素のルールを設定する
 *
 * applyTo オプションに基づいて、指定された要素にスタイルを適用する
 *
 * @param md - MarkdownItインスタンス
 * @param options - 解決済みオプション
 */
export function setupBlockRules(
	md: MarkdownIt,
	options: ResolvedOptions,
): void {
	const styleAttr = generateStyleAttribute({
		styleMode: options.styleMode,
		inlineStyle: options.inlineStyle,
		className: options.className,
	});

	for (const elementType of options.applyTo) {
		const tokenTypes = ELEMENT_TOKEN_MAP[elementType as ElementType];

		if (tokenTypes) {
			for (const tokenType of tokenTypes) {
				extendTokenRule(md, tokenType, styleAttr);
			}
		}
	}
}
