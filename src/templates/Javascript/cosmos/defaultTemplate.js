const defaultTemplate = `
import React from 'react';
import {{fileName}} from '../{{fileName}}';

const props = {
  
};

export default {
  component: {{fileName}},
  props: props,
  reduxState: {},
  fetch: [],
  xhr: []
};
`;

module.exports = defaultTemplate;
