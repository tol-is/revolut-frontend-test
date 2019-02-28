import {
  RATES_WATCH_START,
  RATES_WATCH_STOP,
  RATES_FETCH_START,
  RATES_FETCH_SUCCESS,
  RATES_FETCH_FAIL,
  RATES_FETCH_WAIT,
} from './types';

// reference environment variables needed later
const defaultFetchInterval = process.env.REACT_APP_RATES_WATCH_FETCH_TIMEOUT;
const defaultFailedFetchInterval = process.env.REACT_APP_RATES_FAILED_FETCH_TIMEOUT;
const maxFailedAttempts = process.env.REACT_APP_RATES_MAX_FAILED_ATTEMPTS;


export const ratesWatchStart = symbols => (dispatch, getState) => {
  // short circuit if watch is already enabled
  if (getState().rates.watchEnabled)
    return;
  // dispatch watch start action
  dispatch({
    type    : RATES_WATCH_START,
    payload : symbols,
  });
  // dispatch immediate fetch
  dispatch(fetchRates(symbols));
};


export const ratesWatchStop = () => (dispatch, getState) => {
  // clear timeout to cancel delayed fetch
  clearTimeout(getState().rates.fetchWaitId);
  // dispatch
  dispatch({
    type : RATES_WATCH_STOP,
  });
};


const fetchRatesStart = () => ({
  type : RATES_FETCH_START,
});


const fetchRates = symbols => (dispatch, getState, { api }) => {
  // dispatch start action
  dispatch(fetchRatesStart());
  //consume api method
  api.rates.fetchLatest({ symbols })
    .then(results => dispatch(fetchRatesSuccess(results)))
    .catch(err => dispatch(fetchRatesFail(err)));
};


const fetchRatesDelayed = (timeout = defaultFetchInterval) => (dispatch, getRates) => {
  // dispatch fetch rates after timeout
  // store timeout id in store
  dispatch({
    type    : RATES_FETCH_WAIT,
    payload : setTimeout(() => {
      dispatch(fetchRates(getRates().rates.watchSymbols));
    }, timeout),
  });
};


const fetchRatesSuccess = ({ rates, date }) => (dispatch, getState) => {
  // dispatch success results
  dispatch({
    type    : RATES_FETCH_SUCCESS,
    payload : {
      date  : date,
      rates : rates,
    },
  });
  // if watch is enabled dispatch layed fetch
  const { watchEnabled } = getState().rates;
  watchEnabled && dispatch(fetchRatesDelayed());
};


const fetchRatesFail = error => (dispatch, getState) => {
  // dispatch failed action
  dispatch({
    type    : RATES_FETCH_FAIL,
    payload : error,
  });
  // if fetchAttempt count is less than MAX_FAILED_ATTEMPTS, dispatch a refetch
  const maxAttemptsReached = getState().rates.fetchAttempt >= maxFailedAttempts;
  maxAttemptsReached || dispatch(fetchRatesDelayed(defaultFailedFetchInterval));
};
