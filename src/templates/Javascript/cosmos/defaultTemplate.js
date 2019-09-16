const defaultTemplate = `
import React from 'react';
import {{name}} from '../{{name}}';

const props = {
  
};

export default {
  component: {{name}},
  props: props,
  reduxState: {},
  fetch: [],
  xhr: []
};
`;

module.exports = defaultTemplate;
