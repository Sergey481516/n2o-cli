const normalize = require('normalize-path');
const fs = require('fs');
const Listr = require('listr');
const execa = require('execa');
const { projectInstall } = require('pkg-install');
const chalk = require('chalk');

const {
  optionalFiles,
  DEFAULT_PROJECT_NAME,
  DEFAULT_PROJECT_REPOSITORY,
} = require('./constants');
const { getFilename, compileTemplate, createFile, createDir } = require('./utils');

const Template = require('./templates/Javascript');

const prepareFiles = (template, options) => {
  if (!Array.isArray(template)) {
    return [];
  }
  return template.map(({ postfix, template, optionsMapper = null }) => {
    if (optionsMapper) {
      options = optionsMapper(options);

      if (options.path) {
        createDir(options.path);
      }
    }

    const filename = normalize(getFilename(options, postfix));
    const source = compileTemplate(template, options);

    return {
      filename,
      source
    };
  });
};

const createFilesFromTemplate = async (options) => {
  if (Template[options.template]) {
    if (options.path) {
      createDir(options.path);
    }

    const files = prepareFiles(Template[options.template], options);

    optionalFiles.map(paramName => {
      if (options[paramName]) {
        const template = Template[`generate:${paramName}`];

        files.push(...prepareFiles(template, options));
      }
    });

    await files.map(createFile);
  } else {
    console.log(chalk.red('Шаблон не найден!'));
    process.exit(0);
  }
};

const showHelp = () => {
  const help = `
  Init new project: n2o-cli init [--repository=path] [name] [--repository]
  Creator usage: n2o-cli create:[customization point] [options]
  Generator usage: n2o-cli generate:[generator point] [name] [path]
  
  Customization\`s points: [widget, cell, control, field, fieldset, region, snippet]
  Generator\`s points: [test, story, cosmos]
  
  Options:
    --repository - user repository to clone n2o-boilerplate
    -h, --help
    -s, --story - create storybook template with file
    -c, --cosmos - create cosmos template with file
    -t, --test - create test file with file
  `;

  console.log(help);
  process.exit();
};

const createProject = (repository = DEFAULT_PROJECT_REPOSITORY, projectName = DEFAULT_PROJECT_NAME) => {
  const installDirPath = process.cwd() + '/' + projectName;

  if (fs.existsSync(installDirPath)) {
    console.log('Проект с таким именем уже существует');
    process.exit();
  }

  return new Listr([
     {
       title: 'Создаем проект N2O',
       task: () => new Listr([
         {
           title: 'Клонируем проект',
           task: () => execa('git', ['clone', '--depth=1', repository, projectName])
             .catch((err) => {
               console.log(err);
               process.exit();
             })
         },
         {
           title: 'Устанавливаем зависимости',
           task: () => projectInstall({
             cwd: installDirPath
           })
         }
       ])
     }
  ]);
};

const createTemplate = (options) =>
  new Listr([
    {
      title: 'Создаем шаблон',
      task: () => createFilesFromTemplate(options)
    }
  ]);

const runCustomScript = (executableScript) => {
  const actions = executableScript.split(' ');

  return new Listr([
    {
      title: 'Запускаем пользовательский скрипт',
      task: () => Promise.all(actions.map(action => execa('npm run ' + action).catch((err) => {
        console.error(err);
        return process.exit(1);
      })))
    }
  ]);
};

module.exports = {
  createTemplate,
  showHelp,
  createProject,
  runCustomScript,
};
