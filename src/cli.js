const arg = require('arg');
const inquirer = require('inquirer');

const { createProject, showHelp, createTemplate } = require('./main');
const { resolveOptionsPath } = require('./utils');
const { Command } = require('./constants');

async function promptForMissingOptions(options) {
  const questions = [];

  if (!options.name && options.template !== Command.INIT) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Enter file name:',
      default: 'N2OCustomWidget'
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    name: options.name || answers.name,
  };
}

function parseArgumentsIntoOptions(rawArgs) {
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
    help: args['--help'] || !template,
    story: args['--story'] || false,
    cosmos: args['--cosmos'] || false,
    test: args['--test'] || false,
    template: template,
    name: args._[1],
    path: args._[2],
    repository: args['--repository']
  };

  parsedArgs = resolveOptionsPath(parsedArgs);

  return parsedArgs;
}

async function cli(args) {
  let options = parseArgumentsIntoOptions(args);

  if (options.help) {
    return showHelp();
  }

  options = await promptForMissingOptions(options);

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
}


module.exports = {
  cli
};
