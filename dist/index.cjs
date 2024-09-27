'use strict';

function markdownItWordBreakStyle(md) {
  const originalParagraphOpen = md.renderer.rules.paragraph_open || function(tokens, idx, options, _, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.paragraph_open = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    token.attrSet("style", "word-break:keep-all;overflow-wrap:anywhere");
    return originalParagraphOpen(tokens, idx, options, env, self);
  };
}

module.exports = markdownItWordBreakStyle;
