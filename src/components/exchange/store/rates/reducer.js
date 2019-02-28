import {
  RATES_WATCH_START,
  RATES_WATCH_STOP,
  RATES_FETCH_START,
  RATES_FETCH_SUCCESS,
  RATES_FETCH_FAIL,
  RATES_FETCH_WAIT,
} from './types';

import initialState from './initial-state';

export default (state = initialState, action = {}) => {
  switch (action.type) {
    /* Enable Polling */
    case RATES_WATCH_START :
      return {
        ...state,
        watchEnabled : true,
        fetchAttempt : 0,
        watchSymbols : action.payload,
      };

    /* Disable Polling */
    case RATES_WATCH_STOP :
      return {
        ...state,
        fetching     : false,
        fetchWaitId  : null,
        fetchAttempt : 0,
        fetchError   : null,
        watchEnabled : false,
      };

    /* Fetch Start */
    case RATES_FETCH_START :
      return {
        ...state,
        fetching : true,
      };

    /* Fetch Success */
    case RATES_FETCH_SUCCESS :
      return {
        ...state,
        ...action.payload,
        loaded       : true,
        fetching     : false,
        fetchAttempt : 0,
        fetchError   : null,
      };

    /* Fetch Fail */
    case RATES_FETCH_FAIL :
      return {
        ...state,
        fetchAttempt : state.fetchAttempt + 1,
        fetchError   : action.payload,
        fetching     : false,
      };

    /* Fetch Wait */
    case RATES_FETCH_WAIT :
      return {
        ...state,
        fetchWaitId : action.payload,
      };

    default :
      return state;
  }
};
