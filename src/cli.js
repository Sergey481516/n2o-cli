const arg = require('arg');
const inquirer = require('inquirer');
const chalk = require('chalk');

const { createProject, showHelp, createTemplate } = require('./main');
const { resolveOptionsName, resolveOptionsPath } = require('./utils');
const { Command } = require('./constants');

const promptForMissingOptions = async (options) => {
  const questions = [];

  if (!options.help && !options.name && (options.template !== Command.INIT)) {
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
    parsedArgs = await promptForMissingOptions(parsedArgs);
    parsedArgs = resolveOptionsName(parsedArgs);
    parsedArgs = resolveOptionsPath(parsedArgs);
  }

  return parsedArgs;
};

const cli = async (args) => {
  let options = await parseArgumentsIntoOptions(args);

  if (options.help) {
    return showHelp();
  }

  let tasks = null;

  if (options.template === Command.INIT) {
    tasks = createProject(options.repository, options.name);
  } else {
    tasks = createTemplate(options);
  }

  tasks.run().catch(err => {
    console.error(err);
    process.exit(1);
  });
};


module.exports = {
  cli
};
