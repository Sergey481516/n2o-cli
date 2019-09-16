const widgetContainerTemplate = `
import React from 'react';
import { compose, } from 'recompose';
import widgetContainer from 'n2o/lib/components/widgets/WidgetContainer';
import {{name}} from './{{name}}';

function {{name}}WidgetContainer(props) {
  return (
    <{{name}} {...props}/>
  );
}

const enhance = compose(
    widgetContainer({
        mapProps: props => props
    }),
);

export default enhance({{name}}WidgetContainer);
`;

module.exports = widgetContainerTemplate;
