const path = require('path');

const archy = require('archy');
const dirTree = require('directory-tree');

const sortChildren = (a, b) => {
  if (a.children && !b.children) return -1;
  else if (!a.children && b.children) return 1;
  return a.name > b.name;
};

const processNode = (node, ignore) => {
  if (ignore.indexOf(node.name) !== -1) return;

  const response = {
    label: `${node.name}${ node.children ? '/' : ''}`,
  };

  if (node.children) {
    response.nodes = node
      .children
      .sort(sortChildren)
      .map((child) => processNode(child, ignore))
      .filter((child) => !!child);
  }

  return response;
}

module.exports = function DIRTREE(content, options = {}) {
  const dir = path.resolve(process.cwd(), options.dir || '.');

  const ignore = options.ignore || [
    '.git',
    '.gitkeep',
    '.gitignore',
    'node_modules'
  ];
  
  const tree = archy(processNode(dirTree(dir), ignore));

  return ['```', tree.trim(), '```'].join('\n');
}
