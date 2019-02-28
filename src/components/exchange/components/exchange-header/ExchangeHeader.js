import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ExchangeRateH5 } from '../helpers';

import styles from './styles.css';

class ExchangeHeader extends PureComponent {

  renderCancelButton() {
    return (
      <button type="button" tabIndex={0} onClick={this.props.onCancelClick} className={styles.text_button}>
        Cancel
      </button>
    );
  }

  renderExchangeHeading() {
    return (
      <ExchangeRateH5
        currencySource={this.props.currencySource}
        currencyDestination={this.props.currencyDestination}
        exchangeRate={this.props.exchangeRate}
        exchangeRateTrend={this.props.exchangeRateTrend}
      />
    );
  }

  renderExchangeButton() {
    return (
      <button type="submit" tabIndex={0} disabled={!this.props.exchangeSubmitAllowed} className={styles.text_button}>
        Exchange
      </button>
    );
  }

  render () {
    return (
      <header className={styles.form_header} >
        <div className={styles.form_header_column_left}>
          {this.renderCancelButton()}
        </div>
        <div className={styles.form_header_column_center}>
          <div className={styles.form_header_rate_container}>
            {this.renderExchangeHeading()}
          </div>
        </div>
        <div className={styles.form_header_column_right}>
          {this.renderExchangeButton()}
        </div>
      </header>
    );
  };
}

ExchangeHeader.propTypes = {
  onCancelClick         : PropTypes.func.isRequired,
  exchangeSubmitAllowed : PropTypes.bool.isRequired,
  currencySource        : PropTypes.string.isRequired,
  currencyDestination   : PropTypes.string.isRequired,
  exchangeRate          : PropTypes.number.isRequired,
  exchangeRateTrend     : PropTypes.number.isRequired,
};

export default ExchangeHeader;
