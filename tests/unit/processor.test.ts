import { describe, expect, it } from "vitest";
import { processText } from "../../src/core/processor";
import { ZERO_WIDTH_SPACE } from "../../src/constants";

describe("processText", () => {
	describe("日本語処理", () => {
		it("日本語テキストを分割してセパレータで結合する", () => {
			const result = processText("今日は良い天気です。", "ja");

			// BudoUXによる分割が行われ、ゼロ幅スペースが挿入される
			expect(result).toContain(ZERO_WIDTH_SPACE);
		});

		it("カスタムセパレータを使用できる", () => {
			const result = processText("今日は良い天気です。", "ja", "<wbr>");

			expect(result).toContain("<wbr>");
			expect(result).not.toContain(ZERO_WIDTH_SPACE);
		});

		it("空文字列を処理できる", () => {
			const result = processText("", "ja");

			expect(result).toBe("");
		});

		it("英語のみのテキストも処理できる", () => {
			const result = processText("Hello World", "ja");

			// 英語は分割されないが、エラーにはならない
			expect(typeof result).toBe("string");
		});
	});

	describe("他言語の処理", () => {
		it("簡体字中国語を処理できる", () => {
			const result = processText("这是中文文本", "cs");

			expect(result).toContain(ZERO_WIDTH_SPACE);
		});

		it("繁体字中国語を処理できる", () => {
			const result = processText("這是中文文本", "ct");

			expect(result).toContain(ZERO_WIDTH_SPACE);
		});

		it("タイ語を処理できる", () => {
			const result = processText("นี่คือข้อความภาษาไทย", "th");

			expect(result).toContain(ZERO_WIDTH_SPACE);
		});
	});
});
