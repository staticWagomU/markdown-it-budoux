export default function markdownItWordBreakStyle(md) {
  const originalParagraphOpen = md.renderer.rules.paragraph_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.paragraph_open = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    // スタイルを追加
    token.attrSet('style', 'word-break:keep-all;overflow-wrap:anywhere');

    // オリジナルのレンダリング処理を呼び出す
    return originalParagraphOpen(tokens, idx, options, env, self);
  };

}
