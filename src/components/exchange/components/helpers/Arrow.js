import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './arrow.styles.css';

/**
 * Arrow Render Utility
 */
const Arrow = ({ className, up, right, down, left }) => (
  <span
    className={cx([
      styles.arrow, {
        [styles.up]    : up,
        [styles.right] : right,
        [styles.down]  : down,
        [styles.left]  : left,
      },
      className,
    ])}
  />
);

Arrow.propTypes = {
  up    : PropTypes.bool,
  right : PropTypes.bool,
  down  : PropTypes.bool,
  left  : PropTypes.bool,
};

Arrow.defaultProps = {
  up    : false,
  right : false,
  down  : false,
  left  : false,
};

export default Arrow;
