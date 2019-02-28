import React from 'react';
import ReactDOM from 'react-dom';
import ExchangeLayout from '../components/exchange-layout';

import mockState from './mock-state.json';

it('renders ExchangeLayout without crashing', () => {

  const { rates, accounts, user } = mockState;
  const props = {
    online                 : true,
    rates                  : rates.rates,
    currencies             : Object.keys(accounts.balances),
    accountsBalances       : accounts.balances,
    exchangeDirection      : 'send',
    exchangeAmount         : 100,
    currencySource         : 'GBP',
    currencyDestination    : 'USD',
    setCurrencySource      : () => null,
    setCurrencyDestination : () => null,
    setAmountSource        : () => null,
    setAmountDestination   : () => null,
    cancelExchange         : () => null,

    exchangeCancel        : () => null,
    exchangePending       : false,
    exchangeSubmitAllowed : true,
    exchangeSubmit        : () => null,
  };

  const div = document.createElement('div');
  ReactDOM.render(<ExchangeLayout {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
