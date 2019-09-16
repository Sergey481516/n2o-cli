const regionTemplate = `
import React from 'react';
import { compose } from 'recompose';
import withSecurity from 'n2o/lib/core/auth/withSecurity';
import withWidgetProps from 'n2o/lib/components/regions/withWidgetProps';
import PropTypes from 'prop-types';

function {{name}}Region({
    pageId,
    children,
    pages,
    panels,
    ...rest
}) {
  return (
    <div>Some content...</div>>
  );
}

{{name}}Region.propTypes = {};
{{name}}Region.defaultProps = {};

export default compose(
    withSecurity,
    withWidgetProps
)({{name}}Region);
`;

module.exports = regionTemplate;
