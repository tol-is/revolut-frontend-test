import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ExchangeHeader from '../exchange-header';
import ExchangeCarousel from '../exchange-carousel';
import ExchangeCarouselSlide from '../exchange-carousel-slide';

import styles from './styles.css';

class ExchangeLayout extends PureComponent {

  handleSubmit = e => {
    e.preventDefault();
    this.props.exchangeSubmit();
  }

  renderHeader() {
    const exchangeRateKey = `${this.props.currencySource}-${this.props.currencyDestination}`;
    const exchangeRate = this.props.rates[exchangeRateKey].rate;
    const exchangeRateTrend = this.props.rates[exchangeRateKey].change;

    return (
      <ExchangeHeader
        onCancelClick={this.props.exchangeCancel}
        onExchangeClick={this.props.exchangeSubmit}
        exchangeSubmitAllowed={this.props.exchangeSubmitAllowed}
        exchangeRate={exchangeRate}
        exchangeRateTrend={exchangeRateTrend}
        currencySource={this.props.currencySource}
        currencyDestination={this.props.currencyDestination}
      />
    );
  }

  renderSourceCarouselSlides() {
    // get required props
    const { exchangeAmount, exchangeDirection, currencyDestination, rates } = this.props;

    /* render a carousel slide for each currency */
    return this.props.currencies.map((currency, i) => {
      // get exchange rate for the slide currency,
      // we only need the reverse exchange rate, to the source slide currency
      // for the case the exchange direction is receive
      const exchangeRate = rates[`${currencyDestination}-${currency}`].rate;

      // if direction is send, input value is the user input
      // else if direction is receive, input value is the converted
      const amountValue = exchangeDirection === 'send' ?
        exchangeAmount :
        exchangeAmount * exchangeRate;

      // render slide
      return (
        <ExchangeCarouselSlide
          key={`slide-${i}`}
          type="source"
          className={styles.exchange_carousel_slide}
          disabled={this.props.exchangePending}
          amountValue={amountValue}
          currencySource={currency}
          maxValue={this.props.accountsBalances[currency]}
          onAmountChange={this.props.setAmountSource}
          balance={this.props.accountsBalances[currency]}
        />
      );
    });
  }

  renderDestinationCarouselSlides() {
    // get required props
    const { exchangeAmount, exchangeDirection, currencySource, rates } = this.props;

    return this.props.currencies.map((currency, i) => {
      // get exchange rate for the slide currency,
      // we only need the standard exchange rate,
      // from the source currency, to the destination slide currency
      // for the default case where exchange direction is send
      const exchangeRate = rates[`${currencySource}-${currency}`].rate;

      // if direction is send, value is the converted value,
      // else if direction is receive, value is the user input
      const amountValue = exchangeDirection === 'send' ?
        exchangeAmount * exchangeRate :
        exchangeAmount ;

      // destination slides display a reverse exchange rate
      const reverseExchangeRate =this.props.rates[`${currency}-${this.props.currencySource}`].rate;

      const maxValue = this.props.accountsBalances[currencySource] * exchangeRate;

      return (
        <ExchangeCarouselSlide
          key={`slide-${i}`}
          type="destination"
          className={styles.exchange_carousel_slide}
          disabled={this.props.exchangePending}
          amountValue={amountValue}
          maxValue={maxValue}
          onAmountChange={this.props.setAmountDestination}
          currencySource={currency}
          currencyDestination={this.props.currencySource}
          balance={this.props.accountsBalances[currency]}
          exchangeRate={reverseExchangeRate}
          showRate
        />
      );
    });
  }

  render() {
    const destinationSectionClasses = cx([
      styles.exchange_section_row,
      styles.arrow_down_bg, {
        [styles.hide_arrow] : this.props.currencySource === this.props.currencyDestination,
      },
    ]);

    return (
      <article className={styles.exchange_layout}>
        <form className={styles.exchange_form} onSubmit={this.handleSubmit}>
          {this.renderHeader()}
          <section role="group" className={styles.exchange_section_row}>
            <ExchangeCarousel
              currencies={this.props.currencies}
              selectedCurrency={this.props.currencySource}
              onCarouselChange={this.props.setCurrencySource}
            >
              {this.renderSourceCarouselSlides()}
            </ExchangeCarousel>
          </section>
          <section role="group" className={destinationSectionClasses}>
            <ExchangeCarousel
              currencies={this.props.currencies}
              selectedCurrency={this.props.currencyDestination}
              onCarouselChange={this.props.setCurrencyDestination}
            >
              {this.renderDestinationCarouselSlides()}
            </ExchangeCarousel>
          </section>
        </form>
      </article>
    );
  }
}

/* Prop Types */
ExchangeLayout.propTypes = {
  /* external props */
  online                 : PropTypes.bool,
  /* user accounts */
  currencies             : PropTypes.array.isRequired,
  accountsBalances       : PropTypes.object.isRequired,
  /* exchange view state */
  exchangeAmount         : PropTypes.number.isRequired,
  exchangeDirection      : PropTypes.string.isRequired,
  currencySource         : PropTypes.string,
  setCurrencySource      : PropTypes.func.isRequired,
  setAmountSource        : PropTypes.func.isRequired,
  currencyDestination    : PropTypes.string,
  setCurrencyDestination : PropTypes.func.isRequired,
  setAmountDestination   : PropTypes.func.isRequired,
  /* rates */
  rates                  : PropTypes.object.isRequired,
  exchangeCancel         : PropTypes.func.isRequired,
  exchangePending        : PropTypes.bool.isRequired,
  exchangeSubmitAllowed  : PropTypes.bool.isRequired,
  exchangeSubmit         : PropTypes.func.isRequired,
};

ExchangeLayout.defaultProps = {
  online : true,
};

export default ExchangeLayout;
