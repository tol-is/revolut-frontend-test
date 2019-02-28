import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './dotnav.styles.css';

/**
 * Dot Navigation
 */
class DotNav extends PureComponent {

  clickHandler(options, e) {
    e.preventDefault();
    this.props.onClick(options.index);
  }

  render() {
    // creates an array and renders a list of dots
    const dots = Array.from(new Array(this.props.itemCount)).map((x, i) => {
      const dotOptions = {
        index : i,
      };
      const onClick = this.clickHandler.bind(this, dotOptions);
      const isDotSelected = this.props.itemCurrent === i;
      const dotClassNames = cx([
        styles.dot,
        {
          [styles.selected] : isDotSelected,
        },
      ]);

      return (
        <li key={i} className={dotClassNames}>
          <a href={`#${i}`} onClick={onClick}>{i}</a>
        </li>
      );
    });

    const listClassNames = cx([
      this.props.className,
      styles.dots,
    ]);

    return (
      <ul className={listClassNames}>
        {dots}
      </ul>
    );
  }
}

DotNav.propTypes = {
  onClick     : PropTypes.func.isRequired,
  itemCount   : PropTypes.number.isRequired,
  itemCurrent : PropTypes.number,
};

DotNav.defaultProps = {
  itemCurrent : 0,
};

export default DotNav;
