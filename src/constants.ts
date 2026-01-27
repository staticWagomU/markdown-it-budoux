/**
 * ゼロ幅スペース（U+200B）
 * BudoUXで分割された単語間に挿入され、ブラウザに改行可能位置を示す
 */
export const ZERO_WIDTH_SPACE = "\u200B";

/**
 * デフォルトのインラインスタイル
 * - word-break: keep-all - 単語の途中で改行しない
 * - overflow-wrap: anywhere - 必要に応じて任意の位置で改行
 */
export const DEFAULT_INLINE_STYLE =
	"word-break:keep-all;overflow-wrap:anywhere;";

/**
 * デフォルトのCSSクラス名（styleMode: 'class' 時）
 */
export const DEFAULT_CLASS_NAME = "budoux";

/**
 * 対応言語
 */
export const SUPPORTED_LANGUAGES = ["ja", "cs", "ct", "th"] as const;

/**
 * スタイル適用可能な要素タイプ
 */
export const SUPPORTED_ELEMENTS = [
	"paragraph",
	"heading",
	"table_cell",
	"table_header",
	"list_item",
] as const;

/**
 * 要素タイプから markdown-it トークンタイプへのマッピング
 */
export const ELEMENT_TOKEN_MAP = {
	paragraph: ["paragraph_open"],
	heading: [
		"heading_open", // h1-h6 全て
	],
	table_cell: ["td_open"],
	table_header: ["th_open"],
	list_item: ["list_item_open"],
} as const;
