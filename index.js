const path = require('path');
const { statSync } = require('fs');

const archy = require('archy');
const dirTree = require('directory-tree');

const defaults = {
  depth: Infinity,
  dir: '.',
  onlyDirs: false
}

const sortChildren = (a, b) => {
  if (a.children && !b.children) return -1;
  else if (!a.children && b.children) return 1;
  return a.name.localeCompare(b.name);
};

const processNode = (node, ignore, options, depth = 0) => {
  if (ignore.indexOf(node.name) !== -1 ||
    depth > options.depth ||
    (options.onlyDirs && node.type !== 'directory')
  ) return;

  const response = {
    label: `${node.name}${ node.children ? '/' : ''}`,
  };

  if (node.children && depth < options.depth) {
    depth++;
    response.nodes = node
      .children
      .sort(sortChildren)
      .map((child) => processNode(child, ignore, options, depth))
      .filter((child) => !!child)
  }

  return response;
}

module.exports = function DIRTREE(content, _options = {}, config) {
  const options = Object.assign({}, defaults, _options);

  const dir = path.resolve(path.dirname(config.originalPath), options.dir);

  const ignore = options.ignore || [
    '.git',
    '.gitkeep',
    '.gitignore',
    'node_modules'
  ];

  const tree = archy(processNode(dirTree(dir), ignore, options));

  return ['```', tree.trim(), '```'].join('\n');
}
