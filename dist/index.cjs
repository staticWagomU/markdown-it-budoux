'use strict';

const budoux = require('budoux');

const WORD_BREAK_STYLE = "word-break:keep-all;overflow-wrap:anywhere;";
const ZERO_WIDTH_SPACE = "\u200B";
function markdownItBudoux(md) {
  const originalRules = {
    paragraph_open: md.renderer.rules.paragraph_open || defaultRender,
    text: md.renderer.rules.text || defaultRender
  };
  function defaultRender(tokens, idx, options, _, self) {
    return self.renderToken(tokens, idx, options);
  }
  md.renderer.rules.paragraph_open = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const original_style = token.attrGet("style");
    let style = original_style && original_style[original_style.length - 1] !== ";" ? original_style + ";" : original_style || "";
    token.attrSet("style", style + WORD_BREAK_STYLE);
    return originalRules.paragraph_open(tokens, idx, options, env, self);
  };
  md.renderer.rules.text = function(tokens, idx, options, env, self) {
    const jaParser = budoux.loadDefaultJapaneseParser();
    const processedText = jaParser.parse(tokens[idx].content);
    tokens[idx].content = processedText.join(ZERO_WIDTH_SPACE);
    return originalRules.text(tokens, idx, options, env, self);
  };
}

module.exports = markdownItBudoux;
