import type MarkdownIt from "markdown-it";
import { resolveOptions, type Options } from "./options";
import { setupBlockRules } from "./rules/block";
import { setupTextRule } from "./rules/text";
import type { PluginFunction } from "./types";

/**
 * markdown-it-budoux プラグインを作成する
 *
 * BudoUXを使用して日本語・中国語・タイ語のテキストを適切な位置で
 * 分割し、ブラウザでの改行を改善する。
 *
 * @param options - プラグインオプション
 * @returns markdown-it プラグイン関数
 *
 * @example
 * ```typescript
 * import MarkdownIt from 'markdown-it';
 * import markdownItBudoux from 'markdown-it-budoux';
 *
 * const md = new MarkdownIt();
 * md.use(markdownItBudoux({ language: 'ja' }));
 *
 * const html = md.render('日本語のテキストを処理します。');
 * ```
 */
export function createPlugin(options: Options = {}): PluginFunction {
	const resolvedOptions = resolveOptions(options);

	return (md: MarkdownIt): void => {
		// テキストルールを設定（BudoUX処理）
		setupTextRule(md, resolvedOptions);

		// ブロック要素ルールを設定（スタイル適用）
		setupBlockRules(md, resolvedOptions);
	};
}
