const fieldTemplate = `
import React from 'react';
import PropTypes from 'prop-types';

function {{name}}Field({
  id,
  value,
  visible,
  label,
  control,
  description,
  measure,
  required,
  className,
  labelPosition,
  labelAlignment,
  labelWidth,
  style,
  fieldActions,
  loading,
  autoFocus,
  labelStyle,
  controlStyle,
  labelClass,
  validationClass,
  controlClass,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  touched,
  message,
  colLength,
  help,
  ...props
}) {
  return (
    <div>Some content...</div>
  );
}

{{name}}Field.propTypes = {};
{{name}}Field.defaultProps = {};

export default {{name}}Field;
`;

module.exports = fieldTemplate;
