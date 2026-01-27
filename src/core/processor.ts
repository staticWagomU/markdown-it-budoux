import { getParser } from "../budoux";
import { ZERO_WIDTH_SPACE } from "../constants";
import type { Language } from "../types";

/**
 * BudoUXを使用してテキストを処理し、指定されたセパレータで結合する
 *
 * @param text - 処理対象のテキスト
 * @param language - 処理言語
 * @param separator - 分割後の結合に使用するセパレータ（デフォルト: ゼロ幅スペース）
 * @returns 処理済みテキスト
 */
export function processText(
	text: string,
	language: Language,
	separator: string = ZERO_WIDTH_SPACE,
): string {
	if (text === "") {
		return "";
	}

	const parser = getParser(language);
	const segments = parser.parse(text);

	return segments.join(separator);
}
