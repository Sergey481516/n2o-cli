const testTemplate = `
import React from 'react';
import { mount, shallow } from 'enzyme'; 
import {{name}} from './{{name}}';

const setup = (propsOverride) => {
  const props = {};
  
  return mount(<{{name}} {...props} {...propsOverride} />);
};

describe('<{{name}} />', () => {
  it('Some test', () => {
    const wrapper = setup();
    
  });
});
`;

module.exports = testTemplate;
