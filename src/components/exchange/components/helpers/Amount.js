import React from 'react';
import PropTypes from 'prop-types';
import { parseAmount, getSymbol } from '../../utils';

/**
 * Amount Render Utility
 */
const Amount = ({ currency, value, digits }) => {
  const symbol = getSymbol(currency);
  const amountValue = parseAmount(value, currency);
  return <span><small>{symbol}</small>{amountValue}</span>;
};

Amount.propTypes = {
  value    : PropTypes.number,
  currency : PropTypes.string.isRequired,
  digits   : PropTypes.number,
};

Amount.defaultProps = {
  value  : 0,
  digits : 2,
};

export default Amount;
