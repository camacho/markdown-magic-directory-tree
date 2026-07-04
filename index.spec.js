import path from 'path';
import { describe, expect, it } from 'vitest';
import format from './index.js';

const srcPath = path.join(import.meta.dirname, 'README.md');

describe('markdown-magic-directory-tree', () => {
  it('renders a sorted archy tree with directories before files', () => {
    const result = format({
      content: 'foo',
      options: { dir: './__fixtures__/basic-tree' },
      srcPath,
    });

    expect(result).toMatchSnapshot();
  });

  it('only includes directories when onlyDirs is set', () => {
    const result = format({
      content: 'foo',
      options: { dir: './__fixtures__/dirs-only', onlyDirs: true },
      srcPath,
    });

    expect(result).not.toContain('file.txt');
    expect(result).toContain('keepme/');
  });
});
