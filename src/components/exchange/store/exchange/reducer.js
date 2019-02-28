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

import initialState from './initial-state';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    /* Set exchange currency source */
    case SET_CURRENCY_SOURCE :
      return {
        ...state,
        currencySource : action.payload,
      };

    /* Set exchange currency destination */
    case SET_CURRENCY_DESTINATION :
      return {
        ...state,
        currencyDestination : action.payload,
      };

    /* Set exchange amount source */
    case SET_AMOUNT_SOURCE :
      return {
        ...state,
        amount    : action.payload,
        direction : "send",
      };

    /* Set exchange amount destination */
    case SET_AMOUNT_DESTINATION :
      return {
        ...state,
        amount    : action.payload,
        direction : "receive",
      };

    /* Set exchange amount destination */
    case EXCHANGE_CANCEL :
      return {
        ...state,
        amount    : 0,
        direction : "send",
      };

    /* Exchange Make Start */
    case EXCHANGE_MAKE_START :
      return {
        ...state,
        pending : true,
      };

    /* Exchange Make Start */
    case EXCHANGE_MAKE_SUCCESS :
      return {
        ...state,
        pending   : false,
        amount    : 0,
        direction : "send",
      };

    /* Exchange Make Start */
    case EXCHANGE_MAKE_FAIL :
      return {
        ...state,
        pending : false,
      };


    /* */
    default :
      return state;
  }
}
