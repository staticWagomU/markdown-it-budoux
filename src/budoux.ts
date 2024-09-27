import * as budoux from 'budoux';
import type { Options} from './options';

export type HTMLProcessingParser = budoux.HTMLProcessingParser;
export type Language = Exclude<Options['language'], null | undefined>;


/** Cache for the parser */
const parserCache: Record<string, HTMLProcessingParser> = {};

/**
  * Get the parser for the given language
  * @param language - The language to get the parser for
  * @returns The parser
  */
export function getParser(
	language: Language,
): HTMLProcessingParser {
	switch (language) {
		case 'ja':
			return parserCache.ja ??= budoux.loadDefaultJapaneseParser();
		case 'cs':
			return parserCache.cs ??= budoux.loadDefaultSimplifiedChineseParser();
		case 'ct':
			return parserCache.ct ??= budoux.loadDefaultTraditionalChineseParser();
		case 'th':
			return parserCache.th ??= budoux.loadDefaultThaiParser();
		default:
      language satisfies never;
			throw new Error(`Language ${language} is not supported`);
	}
}
