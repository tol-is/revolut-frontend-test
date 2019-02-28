import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ExchangeView from 'app/components/exchange';

const ExchangeRouteContainer = props => (
  <ExchangeView
    active={props.visible && props.online}
    online={props.online}
  />
);

/* Map State to Props */
const mapStateToProps = (state, ownProps) => ({
  /* pwa props */
  visible : state.pwa.visible,
  online  : state.pwa.online,

});

/* Prop Types */
ExchangeRouteContainer.propTypes = {
  visible : PropTypes.bool.isRequired,
  online  : PropTypes.bool.isRequired,
};


/* compose with redux connect and export */
export default connect(mapStateToProps, null)(ExchangeRouteContainer);
