# markdown-it-budoux

A [markdown-it](https://github.com/markdown-it/markdown-it) plugin that integrates [BudouX](https://github.com/google/budoux) for improved Japanese/Chinese/Thai text wrapping.

## Features

- Applies word-breaking styles to paragraphs, headings, and table cells
- Uses BudouX to insert zero-width spaces for better line breaks
- Supports multiple languages: Japanese, Simplified/Traditional Chinese, Thai
- Flexible configuration with style modes and custom options

## Installation

```bash
npm install markdown-it-budoux
```

## Usage

### Basic Usage

```ts
import MarkdownIt from 'markdown-it';
import markdownItBudoux from 'markdown-it-budoux';

const md = new MarkdownIt();
md.use(markdownItBudoux());

const html = md.render('日本語のテキストを処理します。');
```

### With Slidev

```ts
import { defineConfig } from 'vite'
import '@slidev/cli'
import markdownItBudoux from 'markdown-it-budoux'

export default defineConfig({
  slidev: {
    markdown: {
      markdownItSetup(md) {
        md.use(markdownItBudoux({ language: 'ja' }))
      },
    },
  },
})
```

## Configuration

```ts
md.use(markdownItBudoux({
  // Language for BudouX processing
  // Options: 'ja' (Japanese), 'cs' (Simplified Chinese),
  //          'ct' (Traditional Chinese), 'th' (Thai)
  // Default: 'ja'
  language: 'ja',

  // Separator inserted between BudouX-split segments
  // Default: '\u200B' (zero-width space)
  separator: '\u200B',

  // Style application mode
  // 'inline': Apply inline styles directly
  // 'class': Add CSS class (user provides CSS)
  // Default: 'inline'
  styleMode: 'inline',

  // CSS class name (when styleMode is 'class')
  // Default: 'budoux'
  className: 'budoux',

  // Inline style (when styleMode is 'inline')
  // Default: 'word-break:keep-all;overflow-wrap:anywhere;'
  inlineStyle: 'word-break:keep-all;overflow-wrap:anywhere;',

  // Elements to apply styles to
  // Options: 'paragraph', 'heading', 'table_cell', 'table_header', 'list_item'
  // Default: ['paragraph', 'heading', 'table_cell']
  applyTo: ['paragraph', 'heading', 'table_cell'],
}));
```

### Using CSS Class Mode

If you prefer to manage styles via CSS:

```ts
md.use(markdownItBudoux({
  styleMode: 'class',
  className: 'budoux-text',
}));
```

Then add CSS:

```css
.budoux-text {
  word-break: keep-all;
  overflow-wrap: anywhere;
}
```

## How it works

1. The plugin modifies renderer rules to add styles to specified block elements (paragraphs, headings, table cells, etc.)

2. It processes text nodes using BudouX, inserting zero-width spaces between word boundaries for improved line breaking

3. Existing element styles/classes are preserved and combined with the new styles

## Dependencies

- [markdown-it](https://github.com/markdown-it/markdown-it)
- [budoux](https://github.com/google/budoux)

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
