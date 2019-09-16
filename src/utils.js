const fs = require('fs');
const glob = require('glob');
const Handlebars = require('handlebars');
const mkdirp = require('mkdirp');

const { DefaultPath, optionalFiles } = require('./constants');

function getFilename(options, postfix) {
  return `${options.path}/${options.name}${postfix}.js`;
}

function compileTemplate(template, options) {
 return Handlebars.compile(template)(options);
}

async function createFile({ filename, source }) {
  await fs.writeFile(filename, source, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
}

function createDir(path) {
  if (!fs.existsSync(path)) {
    mkdirp.sync(path);
  }
}

function resolveOptionsPath(args) {
  let path;
  const commandEntity = args.template.split(':')[1];
  const isConfigExists = fs.existsSync('.n2o-clirc.json');

  if (isConfigExists && !path) {
    const _rcConfig = require(process.cwd() + '/' + '.n2o-clirc.json');
    const splitCommand = args.template.split(':');
    path = _rcConfig.src + _rcConfig.paths[splitCommand[1]];
  } else if (!args.path) {
    path = DefaultPath[args.template];
  } else {
    path = args.path
  }

  if (!optionalFiles.includes(commandEntity)) {
    path += '/' + args.name;
  }
  
  return {
    ...args,
    path
  };
}

module.exports = {
  getFilename,
  compileTemplate,
  createFile,
  createDir,
  resolveOptionsPath
};
