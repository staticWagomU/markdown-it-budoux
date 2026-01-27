import type MarkdownIt from "markdown-it";
import type { Renderer, Token } from "markdown-it";
import { processText } from "../core/processor";
import type { ResolvedOptions } from "../options";
import type { RenderRule } from "../types";

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
 * text ルールを拡張する
 *
 * すべてのテキストノードに対してBudoUX処理を適用する
 *
 * @param md - MarkdownItインスタンス
 * @param options - 解決済みオプション
 */
export function setupTextRule(
	md: MarkdownIt,
	options: ResolvedOptions,
): void {
	const originalRule: RenderRule =
		md.renderer.rules.text || defaultRender;

	md.renderer.rules.text = function (
		tokens: Token[],
		idx: number,
		mdOptions: MarkdownIt.Options,
		env: unknown,
		self: Renderer,
	): string {
		const token = tokens[idx];

		// BudoUX処理を適用
		token.content = processText(
			token.content,
			options.language,
			options.separator,
		);

		return originalRule(tokens, idx, mdOptions, env, self);
	};
}
