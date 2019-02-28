import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as pwaActions } from 'app/store/modules/pwa';

/**
 * class PWAContainer
 * @description controls pwa store with connectivity, visibility and responsive props
 */
export class PWAContainer extends PureComponent {

  componentDidMount() {
    this.addConnectivityListeners();
    this.addVisibilityListeners();
  }

  componentWillUnmount() {
    this.removeConnectivityListeners();
    this.removeVisibilityListeners();
  }

  /**
   * Connectivity Listeners and Methods
   */
  addConnectivityListeners() {
    window.addEventListener('online', this.updateConnectivity);
    window.addEventListener('offline', this.updateConnectivity);
    this.updateConnectivity();
  }

  removeConnectivityListeners() {
    window.removeEventListener('online', this.updateConnectivity);
    window.removeEventListener('offline', this.updateConnectivity);
  }

  updateConnectivity = () => {
    this.props.setConnectivity(navigator.onLine);
  }

  /**
   * Visibility Listeners and Methods
   */
  addVisibilityListeners() {
    document.addEventListener('visibilitychange', this.updateVisibility);
    this.updateVisibility();
  }

  removeVisibilityListeners() {
    document.removeEventListener('visibilitychange', this.updateVisibility);
  }

  updateVisibility = () => {
    this.props.setVisibility(!document.hidden);
  }

  render() {
    return this.props.children;
  }
}

/* Map Dispatch to props */
const mapDispatchToProps = dispatch => ({
  /* Set Connectivity Dispatcher */
  setConnectivity : online => {
    dispatch(pwaActions.setConnectivity(online));
  },
  /* Set Visibility Dispatcher */
  setVisibility : visible => {
    dispatch(pwaActions.setVisibility(visible));
  },
});

/* Configure prop types */
PWAContainer.propTypes = {
  setConnectivity : PropTypes.func.isRequired,
  setVisibility   : PropTypes.func.isRequired,
};

/* compose with redux connect and export */
export default connect(null, mapDispatchToProps)(PWAContainer);
