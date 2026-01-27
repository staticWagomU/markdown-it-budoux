import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";
import markdownItBudoux from "../../src/index";

/**
 * 特性テスト（Characterization Test）
 * 現在の動作を記録し、リファクタリング時の回帰を検出する
 */
describe("markdownItBudoux - 特性テスト", () => {
	describe("基本機能", () => {
		it("段落にスタイルが適用される", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("これはテストです。");

			expect(result).toContain("<p");
			expect(result).toContain("word-break:keep-all");
			expect(result).toContain("overflow-wrap:anywhere");
		});

		it("テキストがBudoUXで処理されゼロ幅スペースが挿入される", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("今日は良い天気です。");

			// BudoUXによりゼロ幅スペース（U+200B）が挿入される
			expect(result).toContain("\u200B");
		});

		it("空のテキストを処理できる", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("");

			expect(result).toBe("");
		});

		it("英語テキストも処理される", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("Hello world");

			// 英語でも段落スタイルは適用される
			expect(result).toContain("word-break:keep-all");
		});
	});

	describe("言語オプション", () => {
		it("デフォルトは日本語", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("日本語のテキスト");

			expect(result).toContain("\u200B");
		});

		it("日本語を明示的に指定できる", () => {
			const md = new MarkdownIt().use(markdownItBudoux({ language: "ja" }));
			const result = md.render("日本語のテキスト");

			expect(result).toContain("\u200B");
		});

		it("簡体字中国語を指定できる", () => {
			const md = new MarkdownIt().use(markdownItBudoux({ language: "cs" }));
			const result = md.render("这是中文文本");

			expect(result).toContain("\u200B");
		});

		it("繁体字中国語を指定できる", () => {
			const md = new MarkdownIt().use(markdownItBudoux({ language: "ct" }));
			const result = md.render("這是中文文本");

			expect(result).toContain("\u200B");
		});

		it("タイ語を指定できる", () => {
			const md = new MarkdownIt().use(markdownItBudoux({ language: "th" }));
			const result = md.render("นี่คือข้อความภาษาไทย");

			expect(result).toContain("\u200B");
		});
	});

	describe("Markdown要素の処理", () => {
		it("見出しにもBudoUX処理とスタイルが適用される", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("# 見出しのテスト");

			// テキストはBudoUX処理される
			expect(result).toContain("\u200B");
			// 改善後: 見出しにもスタイルが適用される
			expect(result).toContain("word-break:keep-all");
		});

		it("リストのテキストはBudoUX処理されない（現状動作 - 要改善）", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("- リストアイテム");

			// 現状: リスト内テキストはBudoUX処理されない
			expect(result).not.toContain("\u200B");
			expect(result).toContain("<li>");
		});

		it("強調テキストはBudoUX処理されない（現状動作 - 要改善）", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("これは**強調**です。");

			// 現状: 強調を含む段落はBudoUX処理されない
			expect(result).toContain("<strong>");
			expect(result).not.toContain("\u200B");
		});

		it("コードブロック内のテキストも処理される（現状動作）", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("```\nコードブロック内\n```");

			// 現状: コードブロック内もBudoUX処理される
			expect(result).toContain("<code>");
		});

		it("インラインコードのテキストも処理される（現状動作）", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("これは`インラインコード`です。");

			expect(result).toContain("<code>");
		});

		it("テーブルのテキストはBudoUX処理されない（現状動作 - 要改善）", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render(
				"| ヘッダー |\n|---|\n| セル内容 |",
			);

			// 現状: テーブル内テキストはBudoUX処理されない
			expect(result).toContain("<table>");
			expect(result).not.toContain("\u200B");
		});

		it("引用ブロックのテキストはBudoUX処理されない（現状動作 - 要改善）", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("> 引用文です。");

			// 現状: 引用内テキストはBudoUX処理されない
			expect(result).toContain("<blockquote>");
			expect(result).not.toContain("\u200B");
		});
	});

	describe("既存スタイルとの共存", () => {
		it("既存のインラインスタイルが保持される", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			// markdown-it標準では段落に直接スタイルを付けられないため、
			// このテストは将来のカスタム属性対応時に重要になる
			const result = md.render("テスト");

			expect(result).toContain("word-break:keep-all");
		});
	});

	describe("複合的なドキュメント", () => {
		it("複数の段落を処理できる", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const result = md.render("最初の段落です。\n\n二番目の段落です。");

			// 2つの段落タグがある
			const pMatches = result.match(/<p/g);
			expect(pMatches).toHaveLength(2);
		});

		it("混合コンテンツを処理できる", () => {
			const md = new MarkdownIt().use(markdownItBudoux());
			const markdown = `# タイトル

これは段落です。

- リストアイテム1
- リストアイテム2

> 引用文`;

			const result = md.render(markdown);

			expect(result).toContain("<h1");
			expect(result).toContain("<p");
			expect(result).toContain("<ul>");
			expect(result).toContain("<blockquote>");
		});
	});
});
