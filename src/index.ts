import type MarkdownIt from "markdown-it";
import { Renderer, Token } from "markdown-it";
import { resolveOptions, type Options } from "./options";
import { getParser } from "./budoux";

const WORD_BREAK_STYLE = 'word-break:keep-all;overflow-wrap:anywhere;';
const ZERO_WIDTH_SPACE = '\u200B';

/**
  * apply budoux to markdown-it
  * @param options
  */
export default function markdownItBudoux(options: Options = {}){
  const resolvedOptions = resolveOptions(options);
  const parser = getParser(resolvedOptions.language);

  /**
    * markdown-it plugin which applies budoux to markdown-it
    * @param md
    */
  return (md: MarkdownIt) => {
    const originalRules = {
      paragraph_open: md.renderer.rules.paragraph_open || defaultRender,
      text: md.renderer.rules.text || defaultRender
    };

    function defaultRender(tokens: Token[], idx: number, options: MarkdownIt.Options, _: any, self: Renderer) {
      return self.renderToken(tokens, idx, options);
    }


    md.renderer.rules.paragraph_open = function(tokens, idx, options, env, self) {
      const token = tokens[idx];
      const original_style = token.attrGet('style');
      // original_styleが存在して、最後の文字が';'でない場合、';'を追加
      let style = original_style && original_style[original_style.length - 1] !== ';' ? original_style + ';' : original_style || '';

      token.attrSet('style', style + WORD_BREAK_STYLE);
      return originalRules.paragraph_open(tokens, idx, options, env, self);
    };

    md.renderer.rules.text = function(tokens, idx, options, env, self) {
      const processedText = parser.parse(tokens[idx].content);


      // 処理されたテキストでトークンの内容を置き換え
      tokens[idx].content = processedText.join(ZERO_WIDTH_SPACE);
      return originalRules.text(tokens, idx, options, env, self);
    };

  }
 }
