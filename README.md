# Directory tree plugin

Add directory tree to markdown files via [markdown-magic](https://github.com/DavidWells/markdown-magic)

## Install

```
npm i markdown-magic markdown-magic-directory-tree --save-dev
```

## Adding the plugin

See `example.js` for usage.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example.js) -->

```js
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
```

<!-- AUTO-GENERATED-CONTENT:END -->

## Usage in markdown

<!-- AUTO-GENERATED-CONTENT:START (DIRTREE:dir=./&depth=1) -->

```
markdown-magic-directory-tree/
├── __fixtures__/
├── __snapshots__/
├── .github/
├── example.js
├── index.js
├── index.spec.js
├── package-lock.json
├── package.json
└── README.md
```

<!-- AUTO-GENERATED-CONTENT:END -->

## Options

- **dir** - `process.cwd()` by default
- **ignore** - `['.git', '.gitkeep', '.gitignore', 'node_modules']` by default
- **depth** - `Infinity` by default (how deep in the tree to traverse)
- **onlyDirs** - `false` by default (how mnuch t)
