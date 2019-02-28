import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as ratesActions } from '../store/rates';
import { actions as exchangeActions } from '../store/exchange';
import { actions as accountsActions } from '../store/accounts';

const withReduxState = ComposedComponent => {

  class WithStateContainer extends PureComponent {

    componentDidMount() {
      const { ratesWatchStart, active, currencies, accountsLoaded, accountsBalancesFetch } = this.props;
      // if active start watching rates
      accountsLoaded && active && ratesWatchStart(currencies);
      // if active fetch balances
      active && accountsBalancesFetch();
    }

    /**
     * This is a rubbish, not a production solution
     * should've used redux-observable, or redux-subscribe
     */
    componentDidUpdate(prevProps) {
      const {
        active,
        ratesWatchStart,
        ratesWatchStop,
        currencies,
        accountsLoaded,
        accountsBalancesFetch,
        exchangePending,
      } = this.props;

      // watch rates
      const shouldWatchRates = ((active && !prevProps.active) || (accountsLoaded && !prevProps.accountsLoaded));
      shouldWatchRates && ratesWatchStart(currencies);

      // stop watching rates
      !active && prevProps.active && ratesWatchStop();

      // fetch balances if exchange has finished or widget has been reactivated
      const shouldFetchBalances = (!exchangePending && prevProps.exchangePending) || (active && !prevProps.active);
      shouldFetchBalances && accountsBalancesFetch();
    }

    componentWillUnmount() {
      this.props.ratesWatchStop();
    }

    render() {
      const { ratesLoaded, accountsLoaded, ...rest } = this.props;
      // render null if rates are not loaded
      const hasRequiredData = ratesLoaded && accountsLoaded;
      return hasRequiredData ? <ComposedComponent {...rest} /> : null;
    }
  }

  /* Map State to Props */
  const mapStateToProps = (state, ownProps) => {
    const userCurrencies = Object.keys(state.accounts.balances);
    return {
      /* user */
      accountsBalances      : state.accounts.balances,
      accountsLoaded        : state.accounts.loaded,
      /* exchange view state */
      currencies            : userCurrencies,
      currencySource        : state.exchange.currencySource || userCurrencies[0],
      currencyDestination   : state.exchange.currencyDestination || userCurrencies[1],
      exchangeAmount        : state.exchange.amount,
      exchangeDirection     : state.exchange.direction,
      exchangePending       : state.exchange.pending,
      exchangeSubmitAllowed : ownProps.active && state.exchange.amount > 0 && !state.exchange.pending,
      /* rates state props */
      ratesLoaded           : state.rates.loaded,
      rates                 : state.rates.rates,
    };
  };

  /* Map Dispatch to props */
  const mapDispatchToProps = dispatch => ({
    /* accounts */
    accountsBalancesFetch  : () => dispatch(accountsActions.balancesFetch()),
    /* actions to start/stop watching rates */
    ratesWatchStart        : currencies => dispatch(ratesActions.ratesWatchStart(currencies)),
    ratesWatchStop         : () => dispatch(ratesActions.ratesWatchStop()),
    /* actions to set currency source and destination */
    setCurrencySource      : currency => dispatch(exchangeActions.setCurrencySource(currency)),
    setCurrencyDestination : currency => dispatch(exchangeActions.setCurrencyDestination(currency)),
    /* actions to set amount and transaction direction (send|receive) */
    setAmountSource        : amount => dispatch(exchangeActions.setAmountSource(amount)),
    setAmountDestination   : amount => dispatch(exchangeActions.setAmountDestination(amount)),
    /* cancel/make exchange */
    exchangeCancel         : () => dispatch(exchangeActions.cancelExchange()),
    exchangeSubmit         : () => dispatch(exchangeActions.exchangeSubmit()),
  });

  /* Prop Types */
  WithStateContainer.propTypes = {
    //
    active                 : PropTypes.bool.isRequired,
    online                 : PropTypes.bool.isRequired,
    //
    rates                  : PropTypes.object.isRequired,
    ratesLoaded            : PropTypes.bool.isRequired,
    ratesWatchStart        : PropTypes.func.isRequired,
    ratesWatchStop         : PropTypes.func.isRequired,
    //
    accountsBalancesFetch  : PropTypes.func.isRequired,
    accountsBalances       : PropTypes.object.isRequired,
    accountsLoaded         : PropTypes.bool.isRequired,
    //
    currencies             : PropTypes.array.isRequired,
    currencySource         : PropTypes.string,
    setCurrencySource      : PropTypes.func.isRequired,
    currencyDestination    : PropTypes.string,
    setCurrencyDestination : PropTypes.func.isRequired,
    //
    exchangeAmount         : PropTypes.number,
    exchangeDirection      : PropTypes.string.isRequired,
    setAmountSource        : PropTypes.func.isRequired,
    setAmountDestination   : PropTypes.func.isRequired,
    //
    exchangeCancel         : PropTypes.func.isRequired,
    exchangePending        : PropTypes.bool.isRequired,
    exchangeSubmit         : PropTypes.func.isRequired,
    exchangeSubmitAllowed  : PropTypes.bool.isRequired,
  };

  /* compose with redux connect and export */
  return connect(mapStateToProps, mapDispatchToProps)(WithStateContainer);

};

export default withReduxState;
