
/**
 * Transform exchange response results
 * @description receives an object of exchange rates with USD base and returns a object with  any to any exchange rates, populated from the base rates.
 * @example {
 *  BTC-USD: {
 *   rate: 4532,
 *
 *  USD-BTC: 0.00012
 * }
 */
export default data => {
  // get array of currency keys
  const currencies = Object.keys(data.rates);

  // reduce the currencies array to any-to-any exchange rates object dictionary
  const ratesResults = currencies.reduce((baseRes, baseCurrency) => {
    const currencyRes = currencies.reduce((currencyRes, currency) => ({
      ...currencyRes,
      [`${baseCurrency}-${currency}`] : {
        rate   : data.rates[currency] / data.rates[baseCurrency],
        change : getRandomChange(),
      },
    }), {});

    // spread rates and return result
    return { ...baseRes, ...currencyRes };
  }, {});

  return {
    data  : data.date,
    rates : ratesResults,
  };
};

const getRandomChange = () => {
  let num = Math.floor(Math.random() * 99) + 1; // get a random number between 1 and 99;
  num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1; // randomly make negative
  return num / 100;
};
