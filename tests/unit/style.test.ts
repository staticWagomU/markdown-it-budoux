import { describe, expect, it } from "vitest";
import {
	applyStyleAttribute,
	generateStyleAttribute,
} from "../../src/core/style";
import {
	DEFAULT_CLASS_NAME,
	DEFAULT_INLINE_STYLE,
} from "../../src/constants";

describe("generateStyleAttribute", () => {
	describe("inline モード", () => {
		it("デフォルトのインラインスタイルを生成する", () => {
			const result = generateStyleAttribute({
				styleMode: "inline",
				inlineStyle: DEFAULT_INLINE_STYLE,
				className: DEFAULT_CLASS_NAME,
			});

			expect(result).toEqual({
				name: "style",
				value: DEFAULT_INLINE_STYLE,
			});
		});

		it("カスタムスタイルを使用できる", () => {
			const customStyle = "word-break:break-all;";
			const result = generateStyleAttribute({
				styleMode: "inline",
				inlineStyle: customStyle,
				className: DEFAULT_CLASS_NAME,
			});

			expect(result).toEqual({
				name: "style",
				value: customStyle,
			});
		});
	});

	describe("class モード", () => {
		it("デフォルトのクラス名を生成する", () => {
			const result = generateStyleAttribute({
				styleMode: "class",
				inlineStyle: DEFAULT_INLINE_STYLE,
				className: DEFAULT_CLASS_NAME,
			});

			expect(result).toEqual({
				name: "class",
				value: DEFAULT_CLASS_NAME,
			});
		});

		it("カスタムクラス名を使用できる", () => {
			const result = generateStyleAttribute({
				styleMode: "class",
				inlineStyle: DEFAULT_INLINE_STYLE,
				className: "my-custom-class",
			});

			expect(result).toEqual({
				name: "class",
				value: "my-custom-class",
			});
		});
	});
});

describe("applyStyleAttribute", () => {
	describe("inline モード", () => {
		it("既存のスタイルがない場合、新しいスタイルを追加する", () => {
			const result = applyStyleAttribute(
				undefined,
				{ name: "style", value: DEFAULT_INLINE_STYLE },
			);

			expect(result).toBe(DEFAULT_INLINE_STYLE);
		});

		it("既存のスタイルがある場合、末尾に追加する", () => {
			const result = applyStyleAttribute(
				"color:red;",
				{ name: "style", value: DEFAULT_INLINE_STYLE },
			);

			expect(result).toBe(`color:red;${DEFAULT_INLINE_STYLE}`);
		});

		it("既存のスタイルの末尾にセミコロンがない場合、追加する", () => {
			const result = applyStyleAttribute(
				"color:red",
				{ name: "style", value: DEFAULT_INLINE_STYLE },
			);

			expect(result).toBe(`color:red;${DEFAULT_INLINE_STYLE}`);
		});
	});

	describe("class モード", () => {
		it("既存のクラスがない場合、新しいクラスを追加する", () => {
			const result = applyStyleAttribute(
				undefined,
				{ name: "class", value: DEFAULT_CLASS_NAME },
			);

			expect(result).toBe(DEFAULT_CLASS_NAME);
		});

		it("既存のクラスがある場合、スペース区切りで追加する", () => {
			const result = applyStyleAttribute(
				"existing-class",
				{ name: "class", value: DEFAULT_CLASS_NAME },
			);

			expect(result).toBe(`existing-class ${DEFAULT_CLASS_NAME}`);
		});
	});
});
