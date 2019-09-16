const snippetTemplate = `
import React from 'react';
import PropTypes from 'prop-types';

function {{name}}(props) {
  return (
    <div>Some content...</div>
  );
}

{{name}}.propTypes = {};
{{name}}.defaultProps = {};

export default {{name}};
`;

module.exports = snippetTemplate;
