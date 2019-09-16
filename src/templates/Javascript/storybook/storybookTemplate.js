const storybookTemplate = `
import React from 'react';
import { storiesOf } from '@storybook/react';
import {{name}} from './{{name}}';

const stories = storiesOf('Some name', module);

stories
  .add('Some story', () => {
    const props = {};
    
    return (
      <{{name}} {...props}/>
    );
  });
`;

module.exports = storybookTemplate;
