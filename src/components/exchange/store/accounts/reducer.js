import {
  BALANCES_FETCH_START,
  BALANCES_FETCH_SUCCESS,
  BALANCES_FETCH_FAIL,
} from './types';

import initialState from './initial-state';

export default (state = initialState, action = {}) => {
  switch (action.type) {
    /* Fetch Start */
    case BALANCES_FETCH_START :
      return {
        ...state,
        fetching : true,
      };

    /* Fetch Success */
    case BALANCES_FETCH_SUCCESS :
      return {
        ...state,
        fetching : true,
        loaded   : true,
        balances : action.payload,
      };

    /* Fetch Fail */
    case BALANCES_FETCH_FAIL :
      return {
        ...state,
        fetching : false,
      };

    default :
      return state;
  }
};
