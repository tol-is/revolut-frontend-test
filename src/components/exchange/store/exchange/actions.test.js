import {
  SET_CURRENCY_SOURCE,
  SET_CURRENCY_DESTINATION,
  SET_AMOUNT_SOURCE,
  SET_AMOUNT_DESTINATION,
  EXCHANGE_CANCEL,
} from "./types";

import * as actions from './actions';


describe('exchange-actions', () => {

  /**
   * Set Currency Source
   */
  it('should create an action to set the source currency', () => {
    const payload = 'GBP';
    const expectedAction = {
      type : SET_CURRENCY_SOURCE,
      payload,
    };
    expect(actions.setCurrencySource(payload)).toEqual(expectedAction);
  });

  /**
   * Set Currency Destination
   */
  it('should create an action to set the destination currency', () => {
    const payload = 'USD';
    const expectedAction = {
      type : SET_CURRENCY_DESTINATION,
      payload,
    };
    expect(actions.setCurrencyDestination(payload)).toEqual(expectedAction);
  });

  /**
   * Set Amount Source
   */
  it('should create an action to set the source amount', () => {
    const payload = 'GBP';
    const expectedAction = {
      type : SET_AMOUNT_SOURCE,
      payload,
    };
    expect(actions.setAmountSource(payload)).toEqual(expectedAction);
  });

  /**
   * Set Amount Destination
   */
  it('should create an action to set the destination amount', () => {
    const payload = 'USD';
    const expectedAction = {
      type : SET_AMOUNT_DESTINATION,
      payload,
    };
    expect(actions.setAmountDestination(payload)).toEqual(expectedAction);
  });

  /**
   * Cancel Exchange
   */
  it('should reset the amount and direction', () => {
    const expectedAction = {
      type : EXCHANGE_CANCEL,
    };
    expect(actions.cancelExchange()).toEqual(expectedAction);
  });

});
