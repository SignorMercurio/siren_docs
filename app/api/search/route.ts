import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';
import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin';

export const { GET } = createFromSource(source, {
  // Use Mandarin tokenizer for Chinese text support
  // https://docs.orama.com/docs/orama-js/supported-languages
  tokenizer: await createTokenizer({
    language: 'mandarin',
    stopWords: mandarinStopwords,
  }),
});
