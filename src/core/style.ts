import type { StyleMode } from "../types";

/**
 * スタイル属性の情報
 */
export type StyleAttribute = {
	name: "style" | "class";
	value: string;
};

/**
 * スタイル生成に必要なオプション
 */
export type StyleOptions = {
	styleMode: StyleMode;
	inlineStyle: string;
	className: string;
};

/**
 * styleModeに基づいてスタイル属性を生成する
 *
 * @param options - スタイルオプション
 * @returns スタイル属性情報
 */
export function generateStyleAttribute(options: StyleOptions): StyleAttribute {
	if (options.styleMode === "class") {
		return {
			name: "class",
			value: options.className,
		};
	}

	return {
		name: "style",
		value: options.inlineStyle,
	};
}

/**
 * 既存の属性値に新しいスタイル属性を適用する
 *
 * @param existingValue - 既存の属性値（undefined の場合は新規）
 * @param attribute - 適用するスタイル属性
 * @returns 結合された属性値
 */
export function applyStyleAttribute(
	existingValue: string | undefined | null,
	attribute: StyleAttribute,
): string {
	if (!existingValue) {
		return attribute.value;
	}

	if (attribute.name === "style") {
		// スタイルの場合: セミコロンで区切って結合
		const normalized = existingValue.endsWith(";")
			? existingValue
			: `${existingValue};`;
		return normalized + attribute.value;
	}

	// クラスの場合: スペースで区切って結合
	return `${existingValue} ${attribute.value}`;
}
