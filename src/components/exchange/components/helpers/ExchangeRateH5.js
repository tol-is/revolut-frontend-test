import React from 'react';
import PropTypes from 'prop-types';

import Amount from './AmountAnimated';
import Arrow from './Arrow';

import styles from './exchangerateh5.styles.css';

/**
 * Exchange Rate Heading 5
 */
const ExchangeRateH5 = ({
  className, amount, currencySource, currencyDestination, exchangeRate, exchangeRateTrend,
}) => (
  <h5 className={className}>
    <Amount currency={currencySource} value={amount}/>
    {` = `}
    <Amount currency={currencyDestination} value={amount * exchangeRate}/>
    {exchangeRateTrend !== false ? (
      <Arrow className={styles.arrow} up={exchangeRateTrend > 0} down={exchangeRateTrend <= 0}/>
    ) : null}
  </h5>
);

ExchangeRateH5.propTypes = {
  amount              : PropTypes.number,
  currencySource      : PropTypes.string.isRequired,
  currencyDestination : PropTypes.string.isRequired,
  exchangeRate        : PropTypes.number.isRequired,
  exchangeRateTrend   : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
};

ExchangeRateH5.defaultProps = {
  amount            : 1,
  exchangeRateTrend : false,
};

export default ExchangeRateH5;
