const controlTemplate = `
import React from 'react';
import PropTypes from 'prop-types';

function {{name}}({
    className,
    disabled,
    visible,
    value,
    onChange,
    ...rest
}) {
  return (
    <div>Some content...</div>
  );
}

{{name}}.propTypes = {};
{{name}}.defaultProps = {};

export default {{name}};
`;

module.exports = controlTemplate;
