const defaultTemplate = require('./defaultTemplate');

module.exports = [
  {
    postfix: '',
    template: defaultTemplate,
    optionsMapper: options => ({
      ...options,
      path: options.path + '/__fixtures__',
      fileName: options.name,
      name: 'default',
    })
  }
];
