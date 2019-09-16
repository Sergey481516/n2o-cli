const testTemplate = require('./testTemplate');

module.exports = [
  {
    postfix: '.test',
    template: testTemplate,
    propsMapper: (options) => ({
      ...options,
      path: '.'
    })
  }
];
