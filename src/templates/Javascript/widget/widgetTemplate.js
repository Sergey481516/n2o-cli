const widgetTemplate = `
import React from 'react';
import StandardWidget from 'n2o/lib/components/widgets/StandardWidget';
import dependency from 'n2o/lib/core/dependency';
import Fieldsets from 'n2o/lib/components/widgets/Form/fieldsets';
import {{name}}WidgetContainer from './{{name}}WidgetContainer';

function {{name}}Widget(
 {
  id: widgetId,
  disabled,
  toolbar,
  actions,
  filter,
  ...rest
 }) {
  return (
    <StandardWidget
      disabled={disabled}
      widgetId={widgetId}
      toolbar={toolbar}
      actions={actions}
      className=""
    >
      <{{name}}WidgetContainer widgetId={widgetId} {...rest} />
    </StandardWidget>
  );
}

export default dependency({{name}}Widget);
`;

module.exports = widgetTemplate;
