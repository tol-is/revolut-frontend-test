import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import Amount from './Amount';


/**
 * Amount Render Utility
 */
class AmountAnimated extends PureComponent { q

  static getDerivedStateFromProps = (props, state) => ({
    value : props.value,
  })

  constructor(props){
    super(props);
    this.state = {
      value : props.value,
    };
  }

  render() {
    return (
      <Motion style={{ value : spring(this.state.value) }}>
        {({ value }) => (
          <Amount {...this.props} value={value}  />
        )}
      </Motion>
    );
  }
};


AmountAnimated.propTypes = {
  value : PropTypes.number,
};

AmountAnimated.defaultProps = {
  value : 0,
};

export default AmountAnimated;
