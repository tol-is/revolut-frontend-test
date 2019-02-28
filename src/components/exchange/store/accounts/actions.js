import {
  BALANCES_FETCH_START,
  BALANCES_FETCH_SUCCESS,
  BALANCES_FETCH_FAIL,
} from './types';


export const balancesFetch = userId => (dispatch, getState, { api }) => {
  // dispatch start action
  dispatch(balancesFetchStart());
  //consume api method
  api.revolut.fetchBalances(userId)
    .then(results => dispatch(balancesFetchSuccess(results)))
    .catch(err => dispatch(balancesFetchFail(err)));
};


const balancesFetchStart = () => ({
  type : BALANCES_FETCH_START,
});


const balancesFetchSuccess = ({ balances }) => (dispatch, getState) => {
  // dispatch success results
  dispatch({
    type    : BALANCES_FETCH_SUCCESS,
    payload : balances,
  });
};


const balancesFetchFail = error => (dispatch, getState) => {
  // dispatch failed action
  dispatch({
    type    : BALANCES_FETCH_FAIL,
    payload : error,
  });
};

