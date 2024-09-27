# markdown-it-budoux

A [markdown-it](https://github.com/markdown-it/markdown-it) plugin that integrates [BudouX](https://github.com/google/budoux) for improved Japanese text wrapping.

## Features

- Applies word-breaking and overflow-wrap styles to paragraphs
- Uses BudouX to insert zero-width spaces between Japanese/Chinese etc. words for better line breaks
- Preserves existing paragraph styles

## Installation

```bash
npm install markdown-it-budoux
```

## Usage

for [slidev](https://sli.dev/)
```ts
import { defineConfig } from 'vite'
import '@slidev/cli'
import markdownItBudoux from 'markdown-it-budoux'

export default defineConfig({
  slidev: {
    markdown: {
      /* markdown-it options */
      markdownItSetup(md) {
        /* custom markdown-it plugins */
        md.use(markdownItBudoux({ language: 'ja' }))
      },
    },
  },
})
```

## How it works

1. The plugin modifies the `paragraph_open` rule to add `word-break: keep-all; overflow-wrap: anywhere;` styles to all paragraphs.

2. It also modifies the `text` rule to process Japanese text using BudouX, inserting zero-width spaces between words for improved line breaking.

3. Existing paragraph styles are preserved and combined with the new styles.

## Configuration

This plugin currently doesn't accept any configuration options. It uses the default Japanese parser from BudouX.

## Dependencies

- [markdown-it](https://github.com/markdown-it/markdown-it)
- [budoux](https://github.com/google/budoux)

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
