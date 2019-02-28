import {
  SET_CURRENCY_SOURCE,
  SET_CURRENCY_DESTINATION,
  SET_AMOUNT_SOURCE,
  SET_AMOUNT_DESTINATION,
  EXCHANGE_CANCEL,
} from "./types";

import reducer from './reducer';
import initialState from './initial-state';

describe('exchange reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set the source currency', () => {
    const payload ='GBP';
    expect(
      reducer(undefined, {
        type : SET_CURRENCY_SOURCE,
        payload,
      }),
    ).toEqual({
      ...initialState,
      currencySource : payload,
    });
  });

  it('should set the destination currency', () => {
    const payload = 'GBP';
    expect(
      reducer(undefined, {
        type : SET_CURRENCY_DESTINATION,
        payload,
      }),
    ).toEqual({
      ...initialState,
      currencyDestination : payload,
    });
  });

  it('should set the source amount', () => {
    const payload = 18;
    expect(
      reducer(undefined, {
        type : SET_AMOUNT_SOURCE,
        payload,
      }),
    ).toEqual({
      ...initialState,
      amount    : payload,
      direction : 'send',
    });
  });

  it('should set the destination amount', () => {
    const payload = 18;
    expect(
      reducer(undefined, {
        type : SET_AMOUNT_DESTINATION,
        payload,
      }),
    ).toEqual({
      ...initialState,
      amount    : payload,
      direction : 'receive',
    });
  });

  it('should reset the exchange amount and direction', () => {
    expect(
      reducer(undefined, {
        type : EXCHANGE_CANCEL,
      }),
    ).toEqual({
      ...initialState,
      amount    : 0,
      direction : 'send',
    });
  });

});
