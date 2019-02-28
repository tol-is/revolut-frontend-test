import {
  SET_CURRENCY_SOURCE,
  SET_CURRENCY_DESTINATION,
  SET_AMOUNT_SOURCE,
  SET_AMOUNT_DESTINATION,
  EXCHANGE_CANCEL,
  EXCHANGE_MAKE_START,
  EXCHANGE_MAKE_SUCCESS,
  EXCHANGE_MAKE_FAIL,
} from "./types";


export const setCurrencySource = currency => ({
  type    : SET_CURRENCY_SOURCE,
  payload : currency,
});

export const setCurrencyDestination = currency => ({
  type    : SET_CURRENCY_DESTINATION,
  payload : currency,
});

export const setAmountSource = amount => ({
  type    : SET_AMOUNT_SOURCE,
  payload : amount,
});

export const setAmountDestination = amount => ({
  type    : SET_AMOUNT_DESTINATION,
  payload : amount,
});

export const cancelExchange = amount => ({
  type : EXCHANGE_CANCEL,
});


export const exchangeSubmit = () => (dispatch, getState, { api }) => {
  // collect required information from redux state
  const state = getState();
  const { currencySource, currencyDestination, amount, direction } = state.exchange;
  const { rates } = state.rates;
  const exchangeRate = direction === 'send' ?
    rates[`${currencySource}-${currencyDestination}`].rate :
    rates[`${currencyDestination}-${currencySource}`].rate;
  // mark exchange started
  dispatch(exchangeMakeStart());
  // consume api method
  api.revolut.exchangeCurrency({
    currencySource,
    currencyDestination,
    amount,
    direction,
    exchangeRate,
  })
    .then(results => dispatch(exchangeMakeSuccess(results)))
    .catch(err => dispatch(exchangeMakeFail(err)));
};


const exchangeMakeStart = () => ({
  type : EXCHANGE_MAKE_START,
});


const exchangeMakeSuccess = ({ balances }) => (dispatch, getState) => {
  // dispatch success results
  dispatch({
    type    : EXCHANGE_MAKE_SUCCESS,
    payload : balances,
  });
};


const exchangeMakeFail = error => (dispatch, getState) => {
  // dispatch failed action
  dispatch({
    type    : EXCHANGE_MAKE_FAIL,
    payload : error,
  });
};
