import path from 'path';
import archy from 'archy';
import dirTree from 'directory-tree';

const defaults = {
  depth: Infinity,
  dir: '.',
  onlyDirs: false,
};

const sortEntries = (a, b) => {
  if (a.type === 'directory' && b.type !== 'directory') return -1;
  if (a.type !== 'directory' && b.type === 'directory') return 1;
  return a.name.localeCompare(b.name);
};

const processNode = (node, ignore, options, depth = 0) => {
  if (
    ignore.includes(node.name) ||
    depth > options.depth ||
    (options.onlyDirs && node.type !== 'directory')
  )
    return;

  const response = {
    label: `${node.name}${node.type === 'directory' ? '/' : ''}`,
  };

  if (node.type === 'directory' && depth < options.depth) {
    depth++;
    response.nodes = node.children
      .sort(sortEntries)
      .map((child) => processNode(child, ignore, options, depth))
      .filter((child) => !!child);
  }

  return response;
};

export default function DIRTREE({ content, options = {}, srcPath }) {
  const opts = { ...defaults, ...options };
  const dir = path.resolve(path.dirname(srcPath), opts.dir);
  const ignore = opts.ignore || [
    '.git',
    '.gitkeep',
    '.gitignore',
    'node_modules',
    '.DS_Store',
  ];
  // directory-tree@3 only returns `name`/`path` (+`children`) unless the
  // caller opts in to extra attributes; `type` is required for our
  // directory-vs-file logic (attributes docs: https://github.com/mihneadb/node-directory-tree#options)
  const tree = archy(
    processNode(dirTree(dir, { attributes: ['type'] }), ignore, opts),
  );

  return ['```', tree.trim(), '```'].join('\n');
}
