import currencySymbols from '../fixtures/currencies.json';

export default (amount, currency, digits) => {
  const decimal_digits = digits ? digits : currencySymbols[currency].decimal_digits;
  return parseFloat(amount.toFixed(decimal_digits));
};
