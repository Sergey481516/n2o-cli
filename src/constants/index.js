const Command = {
  INIT: 'init',
  CREATE_WIDGET: 'create:widget',
  CREATE_CELL: 'create:cell',
  CREATE_CONTROL: 'create:control',
  CREATE_FIELD: 'create:field',
  CREATE_FIELDSET: 'create:fieldset',
  CREATE_REGION: 'create:region',
  CREATE_SNIPPET: 'create:snippet',
  GENERATE_TEST: 'generate:test',
  GENERATE_STORY: 'generate:story',
  GENERATE_COSMOS: 'generate:cosmos'
};

const DEFAULT_PROJECT_NAME = 'n2o-project';
const DEFAULT_PROJECT_REPOSITORY = 'https://git.i-novus.ru/framework/n2o-boilerplate.git';

const optionalFiles = [
  'test',
  'cosmos',
  'story'
];

const DefaultName = {
  [Command.CREATE_WIDGET]: 'CustomWidget',
  [Command.CREATE_CELL]: 'CustomCell',
  [Command.CREATE_CONTROL]: 'CustomControl',
  [Command.CREATE_FIELD]: 'CustomField',
  [Command.CREATE_FIELDSET]: 'CustomFieldset',
  [Command.CREATE_REGION]: 'CustomRegion',
  [Command.CREATE_SNIPPET]: 'CustomSnippet',
};

module.exports = {
  Command,
  DefaultName,
  optionalFiles,
  DEFAULT_PROJECT_NAME,
  DEFAULT_PROJECT_REPOSITORY,
};
