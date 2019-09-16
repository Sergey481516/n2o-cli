const cellTemplate = `
import React from 'react';
import PropTypes from 'prop-types';
import withCell from 'n2o/lib/components/widgets/Table/withCell';

function {{name}}Cell({
  id,
  fieldKey,
  className,
  style,
  model,
  callActionImpl,
  visible,
  ...rest
}) {
  return (
    <div>Some content...</div>  
  );
}

{{name}}Cell.propTypes = {};
{{name}}Cell.defaultProps = {};

export default withCell({{name}}Cell);
`;

module.exports = cellTemplate;
