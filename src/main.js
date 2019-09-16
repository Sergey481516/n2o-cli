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

function prepareFiles(template, options) {
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
}

async function createFilesFromTemplate(options) {
  if (Template[options.template]) {

    createDir(options.path);

    const files = prepareFiles(Template[options.template], options);

    optionalFiles.map(paramName => {
      if (options[paramName]) {
        const template = Template[`create:${paramName}`];

        files.push(...prepareFiles(template, options));
      }
    });

    await files.map(createFile);
  } else {
    console.log(chalk.red('Команда не найдена!'));
    process.exit(0);
  }
}

function showHelp() {
  const help = `
  Init new project: n2o-cli init [--repository=path] [name]
  Generator usage: n2o-cli create:[point] [options]
  
  Points: [project, widget, action, cell, control, field, fieldset, region, snippet, test, story]
  
  Options:
    
    -h, --help
    -s, --story - create storybook template with file
    -c, --cosmos - create cosmos template with file
    -t, --test - create test file with file
  `;

  console.log(help);
  process.exit();
}

function createProject(repository = DEFAULT_PROJECT_REPOSITORY, projectName = DEFAULT_PROJECT_NAME) {
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
             if (err.exitCode === 128) {
               console.log('Проект с таким именем уже создан');
               process.exit();
             }
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
}

function createTemplate(options) {
  return new Listr([
    {
      title: 'Создаем шаблон',
      task: () => createFilesFromTemplate(options)
    }
  ]);
}

module.exports = {
  createTemplate,
  showHelp,
  createProject
};
