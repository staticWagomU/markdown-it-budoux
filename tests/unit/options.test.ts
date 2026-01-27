import { describe, expect, it } from "vitest";
import {
	DEFAULT_CLASS_NAME,
	DEFAULT_INLINE_STYLE,
	ZERO_WIDTH_SPACE,
} from "../../src/constants";
import { DEFAULT_OPTIONS, resolveOptions, type Options } from "../../src/options";

describe("resolveOptions", () => {
	describe("デフォルト値", () => {
		it("オプションなしでデフォルト値が適用される", () => {
			const result = resolveOptions({});

			expect(result.language).toBe("ja");
			expect(result.separator).toBe(ZERO_WIDTH_SPACE);
			expect(result.styleMode).toBe("inline");
			expect(result.className).toBe(DEFAULT_CLASS_NAME);
			expect(result.inlineStyle).toBe(DEFAULT_INLINE_STYLE);
			expect(result.applyTo).toEqual([
				"paragraph",
				"heading",
				"table_cell",
			]);
			expect(result.ignoreClass).toBeUndefined();
		});
	});

	describe("language オプション", () => {
		it("日本語を指定できる", () => {
			const result = resolveOptions({ language: "ja" });
			expect(result.language).toBe("ja");
		});

		it("簡体字中国語を指定できる", () => {
			const result = resolveOptions({ language: "cs" });
			expect(result.language).toBe("cs");
		});

		it("繁体字中国語を指定できる", () => {
			const result = resolveOptions({ language: "ct" });
			expect(result.language).toBe("ct");
		});

		it("タイ語を指定できる", () => {
			const result = resolveOptions({ language: "th" });
			expect(result.language).toBe("th");
		});
	});

	describe("separator オプション", () => {
		it("カスタムセパレータを指定できる", () => {
			const result = resolveOptions({ separator: "<wbr>" });
			expect(result.separator).toBe("<wbr>");
		});

		it("空文字列も指定できる", () => {
			const result = resolveOptions({ separator: "" });
			expect(result.separator).toBe("");
		});
	});

	describe("styleMode オプション", () => {
		it("inline モードを指定できる", () => {
			const result = resolveOptions({ styleMode: "inline" });
			expect(result.styleMode).toBe("inline");
		});

		it("class モードを指定できる", () => {
			const result = resolveOptions({ styleMode: "class" });
			expect(result.styleMode).toBe("class");
		});
	});

	describe("className オプション", () => {
		it("カスタムクラス名を指定できる", () => {
			const result = resolveOptions({ className: "my-budoux" });
			expect(result.className).toBe("my-budoux");
		});
	});

	describe("inlineStyle オプション", () => {
		it("カスタムスタイルを指定できる", () => {
			const customStyle = "word-break:break-all;";
			const result = resolveOptions({ inlineStyle: customStyle });
			expect(result.inlineStyle).toBe(customStyle);
		});
	});

	describe("applyTo オプション", () => {
		it("適用対象を限定できる", () => {
			const result = resolveOptions({ applyTo: ["paragraph"] });
			expect(result.applyTo).toEqual(["paragraph"]);
		});

		it("複数の要素を指定できる", () => {
			const result = resolveOptions({
				applyTo: ["paragraph", "heading", "list_item"],
			});
			expect(result.applyTo).toEqual(["paragraph", "heading", "list_item"]);
		});

		it("空配列も指定できる（BudoUX処理のみ、スタイルなし）", () => {
			const result = resolveOptions({ applyTo: [] });
			expect(result.applyTo).toEqual([]);
		});
	});

	describe("ignoreClass オプション", () => {
		it("無視するクラスを指定できる", () => {
			const result = resolveOptions({ ignoreClass: "no-budoux" });
			expect(result.ignoreClass).toBe("no-budoux");
		});
	});

	describe("複合オプション", () => {
		it("複数のオプションを同時に指定できる", () => {
			const result = resolveOptions({
				language: "cs",
				separator: "<wbr>",
				styleMode: "class",
				className: "chinese-text",
				applyTo: ["paragraph", "table_cell"],
				ignoreClass: "skip-budoux",
			});

			expect(result.language).toBe("cs");
			expect(result.separator).toBe("<wbr>");
			expect(result.styleMode).toBe("class");
			expect(result.className).toBe("chinese-text");
			expect(result.applyTo).toEqual(["paragraph", "table_cell"]);
			expect(result.ignoreClass).toBe("skip-budoux");
		});
	});
});

describe("DEFAULT_OPTIONS", () => {
	it("デフォルトオプションが定義されている", () => {
		expect(DEFAULT_OPTIONS).toBeDefined();
		expect(DEFAULT_OPTIONS.language).toBe("ja");
	});
});
