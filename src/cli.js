const arg = require('arg');
const inquirer = require('inquirer');
const chalk = require('chalk');

const { createProject, showHelp, createTemplate, runCustomScript } = require('./main');
const { resolveOptionsName, resolveOptionsPath, getConfigExecutableScripts, find } = require('./utils');
const { Command } = require('./constants');

const promptForMissingOptions = async (options) => {
  const questions = [];

  if (!options.name && Command[options.template]) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Enter file name:',
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    name: options.name || answers.name,
  };
};

const parseArgumentsIntoOptions = async (rawArgs) => {
  const args = arg({
    '--help': Boolean,
    '-h': '--help',
    '--story': Boolean,
    '-s': '--story',
    '--cosmos': Boolean,
    '-c': '--cosmos',
    '--test': Boolean,
    '-t': '--test',
    '--repository': String
  }, { argv: rawArgs.slice(2) });
  const template = args._[0];

  let parsedArgs = {
    help: args['--help'],
    story: args['--story'] || false,
    cosmos: args['--cosmos'] || false,
    test: args['--test'] || false,
    template: template,
    name: args._[1],
    path: args._[2],
    repository: args['--repository']
  };

  if (!template && !parsedArgs.help) {
    console.log(chalk.red('ERROR: Command not found!'));
    return showHelp();
  }

  if (!parsedArgs.help) {
    parsedArgs = resolveOptionsName(parsedArgs);
    parsedArgs = resolveOptionsPath(parsedArgs);
  }

  return parsedArgs;
};

const cli = async (args) => {
  let options = await parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);

  if (options.help) {
    return showHelp();
  }

  let tasks = null;
  const standardCommand = find(Command, (value) => value === options.template);
  const configExecutableScript = getConfigExecutableScripts(options);

  if (options.template === Command.INIT) {
    tasks = createProject(options.repository, options.name);
  } else if (standardCommand) {
    tasks = createTemplate(options);
  } else if (configExecutableScript) {
    tasks = runCustomScript(configExecutableScript);
  } else {
    console.log(chalk.red('Команда не найдена!'));
    return process.exit(0);
  }

  tasks.run().catch(err => {
    console.error(err);
    process.exit(1);
  });
};


module.exports = {
  cli
};
