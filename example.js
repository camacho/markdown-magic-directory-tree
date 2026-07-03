import path from 'path';
import { markdownMagic } from 'markdown-magic';
import DIRTREE from './index.js';

const config = {
  matchWord: 'AUTO-GENERATED-CONTENT',
  transforms: {
    DIRTREE,
  },
};

const markdownPath = path.join(import.meta.dirname, 'README.md');
await markdownMagic(markdownPath, config);
