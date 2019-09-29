const fs = require('fs');
const Handlebars = require('handlebars');
const mkdirp = require('mkdirp');

const { optionalFiles, DefaultName, CONFIG_FILENAME } = require('./constants');
const _defaultConfig = require('./' + CONFIG_FILENAME);

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

const getConfig = () => {
  const isUserConfigExists = fs.existsSync(CONFIG_FILENAME);

  return isUserConfigExists ? require(process.cwd() + '/' + CONFIG_FILENAME) : _defaultConfig;
};

const resolveOptionsPath = (args) => {
  let path = args.path;
  const commandEntity = args.template && args.template.split(':')[1];
  const config = getConfig();
  const isOptionalFile = optionalFiles.includes(commandEntity);

  if (!path && !isOptionalFile) {
    const splitCommand = args.template.split(':');
    path = config.src + config.paths[splitCommand[1]] + '/' + args.name;
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

const getConfigExecutableScripts = (args) => {
  const { scripts } = getConfig();

  return scripts[args.template] || null;
};

const find = (collection, func) => {
  if (!collection || typeof collection !== 'object')
    return console.error('First argument must be a collection!');
  if (!func || typeof func !== 'function')
    return console.error('Second argument must be a function');

  let result;
  const collectionKeys = Object.keys(collection);

  for (let i = 0; i < collectionKeys.length; i++) {
    const currentKey = collectionKeys[i];
    const funcResult = func(collection[currentKey], currentKey);

    if (funcResult) {
      result = collection[currentKey];
      break;
    }
  }

  return result;
};

module.exports = {
  getFilename,
  compileTemplate,
  createFile,
  createDir,
  resolveOptionsName,
  resolveOptionsPath,
  getConfigExecutableScripts,
  find,
};
