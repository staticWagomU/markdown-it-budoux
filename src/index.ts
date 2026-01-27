/**
 * markdown-it-budoux
 *
 * markdown-it プラグインとして BudoUX を統合し、
 * 日本語・中国語・タイ語のテキスト折り返しを改善する。
 *
 * @packageDocumentation
 */

// プラグイン本体
import { createPlugin } from "./plugin";
export default createPlugin;

// 型のエクスポート
export type { Options, ResolvedOptions } from "./options";
export type {
	ElementType,
	Language,
	PluginFunction,
	RenderRule,
	StyleMode,
} from "./types";

// 定数のエクスポート（上級ユーザー向け）
export {
	DEFAULT_CLASS_NAME,
	DEFAULT_INLINE_STYLE,
	ELEMENT_TOKEN_MAP,
	SUPPORTED_ELEMENTS,
	SUPPORTED_LANGUAGES,
	ZERO_WIDTH_SPACE,
} from "./constants";

// BudoUX パーサー（上級ユーザー向け）
export { getParser, type HTMLProcessingParser } from "./budoux";
