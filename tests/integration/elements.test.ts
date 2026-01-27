import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";
import markdownItBudoux from "../../src/index";

/**
 * 各要素タイプへのスタイル適用テスト
 */
describe("要素別スタイル適用", () => {
	describe("paragraph", () => {
		it("段落にスタイルが適用される", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("テスト段落");

			expect(result).toContain('<p style="word-break:keep-all');
		});
	});

	describe("heading", () => {
		it("h1 にスタイルが適用される", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("# 見出し1");

			expect(result).toContain('<h1 style="word-break:keep-all');
		});

		it("h2 にスタイルが適用される", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("## 見出し2");

			expect(result).toContain('<h2 style="word-break:keep-all');
		});

		it("h3 にスタイルが適用される", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("### 見出し3");

			expect(result).toContain('<h3 style="word-break:keep-all');
		});
	});

	describe("table_cell", () => {
		it("テーブルセルにスタイルが適用される", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("| セル内容 |\n|---|\n| データ |");

			expect(result).toContain('<td style="word-break:keep-all');
		});

		it("applyTo に table_header を追加するとヘッダーセルにもスタイルが適用される", () => {
			const md = new MarkdownIt().use(
				markdownItBudoux({
					applyTo: ["paragraph", "heading", "table_cell", "table_header"],
				}),
			);
			const result = md.render("| ヘッダー |\n|---|\n| データ |");

			expect(result).toContain('<th style="word-break:keep-all');
		});
	});

	describe("applyTo オプション", () => {
		it("paragraph のみに限定できる", () => {
			const md = new MarkdownIt().use(
				markdownItBudoux({ applyTo: ["paragraph"] }),
			);
			const result = md.render("# 見出し\n\n段落");

			// 段落にはスタイルあり
			expect(result).toContain('<p style="word-break:keep-all');
			// 見出しにはスタイルなし
			expect(result).toMatch(/<h1>見出し<\/h1>/);
		});

		it("空配列にすると全要素でスタイルが適用されない", () => {
			const md = new MarkdownIt().use(markdownItBudoux({ applyTo: [] }));
			const result = md.render("# 見出し\n\n段落テストです");

			// どちらにもスタイルなし
			expect(result).not.toContain('style="word-break');
			// BudoUX処理は行われる（純粋なテキストのみ）
			// 注: markdown-itのtext処理対象は純粋なテキストノードのみ
			expect(result).toContain("段落");
		});
	});
});

describe("styleMode オプション", () => {
	describe("inline モード（デフォルト）", () => {
		it("インラインスタイルが適用される", () => {
			const md = new MarkdownIt().use(
				markdownItBudoux({ styleMode: "inline" }),
			);
			const result = md.render("テスト");

			expect(result).toContain('style="word-break:keep-all');
		});
	});

	describe("class モード", () => {
		it("CSSクラスが適用される", () => {
			const md = new MarkdownIt().use(
				markdownItBudoux({ styleMode: "class" }),
			);
			const result = md.render("テスト");

			expect(result).toContain('class="budoux"');
			expect(result).not.toContain('style="word-break');
		});

		it("カスタムクラス名を使用できる", () => {
			const md = new MarkdownIt().use(
				markdownItBudoux({
					styleMode: "class",
					className: "my-custom-budoux",
				}),
			);
			const result = md.render("テスト");

			expect(result).toContain('class="my-custom-budoux"');
		});
	});
});

describe("separator オプション", () => {
	it("カスタムセパレータを使用できる", () => {
		const md = new MarkdownIt().use(
			markdownItBudoux({ separator: "|" }),
		);
		const result = md.render("今日は良い天気です。");

		// 注: HTMLタグ形式のセパレータはエスケープされる
		// パイプなど安全な文字を使用
		expect(result).toContain("|");
		expect(result).not.toContain("\u200B");
	});

	it("空文字列でセパレータなしにできる", () => {
		const md = new MarkdownIt().use(markdownItBudoux({ separator: "" }));
		const result = md.render("今日は良い天気です。");

		// BudoUX処理はされるが、セパレータはない
		expect(result).not.toContain("\u200B");
	});
});

describe("inlineStyle オプション", () => {
	it("カスタムスタイルを使用できる", () => {
		const customStyle = "word-break:break-all;line-height:1.5;";
		const md = new MarkdownIt().use(
			markdownItBudoux({ inlineStyle: customStyle }),
		);
		const result = md.render("テスト");

		expect(result).toContain(`style="${customStyle}"`);
	});
});
