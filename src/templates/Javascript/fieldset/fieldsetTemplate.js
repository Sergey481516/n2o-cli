const fieldsetTemplate = `
import React from 'react';
import PropTypes from 'prop-types';

function {{name}}Fieldset({
  render,
  rows,
  className,
  ...rest
}){
  return (
    <div>{render(rows)}</div>
  );
}

{{name}}Fieldset.propTypes = {};
{{name}}Fieldset.defaultProps = {};

export default {{name}}Fieldset;
`;

module.exports = fieldsetTemplate;
