const Command = {
  INIT: 'init',
  CREATE_WIDGET: 'create:widget',
  CREATE_ACTION: 'create:action',
  CREATE_CELL: 'create:cell',
  CREATE_CONTROL: 'create:control',
  CREATE_FIELD: 'create:field',
  CREATE_FIELDSET: 'create:fieldset',
  CREATE_REGION: 'create:region',
  CREATE_SNIPPET: 'create:snippet',
  CREATE_TEST: 'create:test',
  CREATE_STORY: 'create:story',
  CREATE_COSMOS: 'create:cosmos'
};

const DEFAULT_PROJECT_NAME = 'n2o-project';
const DEFAULT_PROJECT_REPOSITORY = 'https://git.i-novus.ru/framework/n2o-boilerplate.git';

const optionalFiles = [
  'test',
  'cosmos',
  'story'
];

const DEFAULT_DIR_PATH = './packages/custom/src';
const DEFAULT_COMPONENTS_PREFIX = DEFAULT_DIR_PATH + '/components';

const DefaultPath = {
  [Command.CREATE_WIDGET]: DEFAULT_COMPONENTS_PREFIX + '/widgets',
  [Command.CREATE_ACTION]: DEFAULT_DIR_PATH + '/actions',
  [Command.CREATE_CELL]: DEFAULT_COMPONENTS_PREFIX + '/cells',
  [Command.CREATE_CONTROL]: DEFAULT_COMPONENTS_PREFIX + '/controls',
  [Command.CREATE_FIELD]: DEFAULT_COMPONENTS_PREFIX + '/fields',
  [Command.CREATE_FIELDSET]: DEFAULT_COMPONENTS_PREFIX + '/fieldsets',
  [Command.CREATE_REGION]: DEFAULT_COMPONENTS_PREFIX + '/regions',
  [Command.CREATE_SNIPPET]: DEFAULT_COMPONENTS_PREFIX + '/snippets',
};

module.exports = {
  Command,
  DefaultPath,
  optionalFiles,
  DEFAULT_PROJECT_NAME,
  DEFAULT_PROJECT_REPOSITORY
};
