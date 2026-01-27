import defu from "defu";
import {
	DEFAULT_CLASS_NAME,
	DEFAULT_INLINE_STYLE,
	ZERO_WIDTH_SPACE,
} from "./constants";
import type { ElementType, Language, StyleMode } from "./types";

/**
 * markdown-it-budoux プラグインのオプション
 */
export type Options = {
	/**
	 * 処理対象の言語
	 * @default 'ja'
	 */
	language?: Language;

	/**
	 * BudoUXで分割した際のセパレータ
	 * @default '\u200B' (ゼロ幅スペース)
	 */
	separator?: string;

	/**
	 * スタイル適用の方式
	 * - 'inline': インラインスタイルを直接適用
	 * - 'class': CSSクラスを付与（ユーザーがCSSを用意）
	 * @default 'inline'
	 */
	styleMode?: StyleMode;

	/**
	 * 付与するCSSクラス名（styleMode: 'class' 時）
	 * @default 'budoux'
	 */
	className?: string;

	/**
	 * インラインスタイル（styleMode: 'inline' 時）
	 * @default 'word-break:keep-all;overflow-wrap:anywhere;'
	 */
	inlineStyle?: string;

	/**
	 * スタイルを適用する要素
	 * @default ['paragraph', 'heading', 'table_cell']
	 */
	applyTo?: ElementType[];

	/**
	 * BudoUX処理を無効化するHTMLクラス
	 * このクラスを持つ要素の子テキストは処理しない
	 * @default undefined
	 */
	ignoreClass?: string;
};

/**
 * 解決済みオプション（全プロパティ必須、ignoreClass のみオプショナル）
 */
export type ResolvedOptions = {
	language: Language;
	separator: string;
	styleMode: StyleMode;
	className: string;
	inlineStyle: string;
	applyTo: ElementType[];
	ignoreClass: string | undefined;
};

/**
 * デフォルトオプション
 */
export const DEFAULT_OPTIONS: ResolvedOptions = {
	language: "ja",
	separator: ZERO_WIDTH_SPACE,
	styleMode: "inline",
	className: DEFAULT_CLASS_NAME,
	inlineStyle: DEFAULT_INLINE_STYLE,
	applyTo: ["paragraph", "heading", "table_cell"],
	ignoreClass: undefined,
};

/**
 * ユーザーオプションとデフォルトオプションをマージして解決済みオプションを返す
 * @param options - ユーザー指定のオプション
 * @returns 解決済みオプション
 *
 * 注: applyTo は配列だが、defu はデフォルトで配列をマージ（連結）する。
 * ユーザーが applyTo を指定した場合は、その値で完全に置き換えたいため、
 * 事前に applyTo を除いてマージし、その後で applyTo を設定する。
 */
export function resolveOptions(options: Options): ResolvedOptions {
	const { applyTo, ...rest } = options;
	const merged = defu(rest, DEFAULT_OPTIONS) as ResolvedOptions;

	// applyTo は明示的に指定された場合のみ置き換え
	if (applyTo !== undefined) {
		merged.applyTo = applyTo;
	}

	return merged;
}
