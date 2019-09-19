const { Command } = require('../../constants');

const widgetTemplate = require('../../templates/Javascript/widget');
const cellTemplate = require('../../templates/Javascript/cell');
const controlTemplate = require('../../templates/Javascript/control');
const fieldTemplate = require('../../templates/Javascript/field');
const fieldsetTemplate = require('../../templates/Javascript/fieldset');
const regionTemplate = require('../../templates/Javascript/region');
const snippetTemplate = require('../../templates/Javascript/snippet');
const testTemplate = require('../../templates/Javascript/test');
const cosmosTemplate = require('../../templates/Javascript/cosmos');
const storybookTemplate = require('../../templates/Javascript/storybook');

const Template = {
  [Command.CREATE_WIDGET]: widgetTemplate,
  [Command.CREATE_CELL]: cellTemplate,
  [Command.CREATE_CONTROL]: controlTemplate,
  [Command.CREATE_FIELD]: fieldTemplate,
  [Command.CREATE_FIELDSET]: fieldsetTemplate,
  [Command.CREATE_REGION]: regionTemplate,
  [Command.CREATE_SNIPPET]: snippetTemplate,
  [Command.GENERATE_TEST]: testTemplate,
  [Command.GENERATE_STORY]: storybookTemplate,
  [Command.GENERATE_COSMOS]: cosmosTemplate
};

module.exports = Template;
