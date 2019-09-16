const widgetTemplate = require('./widgetTemplate');
const widgetContainerTemplate = require('./widgetContainerTemplate');
const widgetComponentTemplate = require('./widgetComponentTemplate');

module.exports = [
  {
    postfix: 'Widget',
    template: widgetTemplate
  },
  {
    postfix: 'WidgetContainer',
    template: widgetContainerTemplate
  },
  {
    postfix: '',
    template: widgetComponentTemplate
  }
];
