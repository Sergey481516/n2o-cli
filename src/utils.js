const fs = require('fs');
const Handlebars = require('handlebars');
const mkdirp = require('mkdirp');

const { optionalFiles, DefaultName } = require('./constants');
const _defaultConfig = require('./.n2o-clirc.json');

const getFilename = (options, postfix) =>
  `${(options.path || '.')}/${options.name}${postfix}.js`;

const compileTemplate = (template, options) => Handlebars.compile(template)(options);

const createFile = async ({ filename, source }) => {
  await fs.writeFile(filename, source, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

const createDir = (path) => {
  if (!fs.existsSync(path)) {
    mkdirp.sync(path);
  }
};

const resolveOptionsPath = (args) => {
  let path;
  const commandEntity = args.template && args.template.split(':')[1];
  const isUserConfigExists = fs.existsSync('.n2o-clirc.json');
  const isOptionalFile = optionalFiles.includes(commandEntity);

  if (!path && !isOptionalFile) {
    const _rcConfig =
      isUserConfigExists ? require(process.cwd() + '/' + '.n2o-clirc.json') : _defaultConfig;
    const splitCommand = args.template.split(':');
    path = _rcConfig.src + _rcConfig.paths[splitCommand[1]] + '/' + args.name;
  } else {
    path = args.path;
  }

  return {
    ...args,
    path,
  };
};

const resolveOptionsName = (args) => ({
  ...args,
  name: args.name || DefaultName[args.template]
});

module.exports = {
  getFilename,
  compileTemplate,
  createFile,
  createDir,
  resolveOptionsName,
  resolveOptionsPath,
};
