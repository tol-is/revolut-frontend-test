import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ExchangeRateH5,
  AmountAnimated as Amount,
} from '../helpers';
import { parseAmount } from '../../utils';

import styles from './styles.css';

class ExchangeCarouseltem extends PureComponent {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focusOnInput = () => {
    this.inputRef.current.focus();
  }

  handleInputKeyDown = e => {
    if (this.props.disabled) return;
    const step = e.shiftKey ? 10 : 1;
    if (e.key === 'ArrowUp') {
      this.increaseValue(step);
    } else if (e.key === 'ArrowDown') {
      this.decreaseValue(step);
    }
  }

  handleInputChange = () => {
    const value = this.getInputValue();
    this.setAmount(value);
  }

  /* TODO: this implementation doesn't allow decimals */
  getInputValue() {
    const inputValue = Number.parseFloat(this.inputRef.current.value);
    let value = Number.isNaN(inputValue) ? 0 : inputValue;
    return Math.min(value, this.props.maxValue);
  }

  increaseValue(step) {
    let value = this.getInputValue();
    value = Number.parseInt(value + step, 10);
    value = Math.min(value, this.props.maxValue);
    this.setAmount(value);
  }

  decreaseValue(step) {
    let value = this.getInputValue();
    value = Number.parseInt(value - step, 10);
    this.setAmount(Math.max(value, 0));
  }

  setAmount(amount) {
    this.props.onAmountChange(amount);
    this.moveCaretToEnd();
  }

  moveCaretToEnd() {
    setTimeout(() => {
      this.inputRef.current.selectionStart = this.inputRef.current.selectionEnd = 10000;
    }, 0);
  }

  renderInputField() {
    // parse amount with utility function
    const inputValue = parseAmount(this.props.amountValue, this.props.currencySource);
    return <input
      type="text"
      placeholder=" "
      tabIndex={0}
      ref={this.inputRef}
      disabled={this.props.disabled}
      className={styles.input_amount}
      aria-label={`Input ${this.props.type}: ${this.props.currencySource}`}
      value={inputValue > 0 ? inputValue : ''}
      onKeyDown={this.handleInputKeyDown}
      onChange={this.handleInputChange}
    />;
  }

  renderAccountBalance() {
    return (
      <h5 className={styles.slide_subtitle}>
        You have <Amount currency={this.props.currencySource} value={this.props.balance} />
      </h5>
    );
  }

  renderExchangeRate() {
    return this.props.showRate ? (
      <ExchangeRateH5
        className={styles.slide_subtitle}
        currencySource={this.props.currencySource}
        currencyDestination={this.props.currencyDestination}
        exchangeRate={this.props.exchangeRate}
      />
    ) : null;
  }

  render() {
    return (
      <div className={styles.exchange_carousel_slide} onClick={this.focusOnInput}>
        <div className={styles.slide_content_row}>
          <div className={styles.slide_content_column_left}>
            <h4 className={styles.slide_title}>{this.props.currencySource}</h4>
          </div>
          <div className={styles.slide_content_column_right}>
            {this.renderInputField()}
          </div>
        </div>
        <div className={styles.slide_content_row}>
          <div className={styles.slide_content_column_left}>
            {this.renderAccountBalance()}
          </div>
          <div className={styles.slide_content_column_right}>
            {this.renderExchangeRate()}
          </div>
        </div>
      </div>
    );
  }
}

ExchangeCarouseltem.propTypes = {
  disabled    : PropTypes.bool.isRequired,
  /* used for accesible input label */
  type        : PropTypes.oneOf([ 'source', 'destination' ]),
  /* slide currency */
  balance     : PropTypes.number,
  amountValue : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  maxValue            : PropTypes.number.isRequired,
  onAmountChange      : PropTypes.func.isRequired,
  /* */
  currencySource      : PropTypes.string,
  currencyDestination : PropTypes.string,
  exchangeRate        : PropTypes.number,
  showRate            : PropTypes.bool.isRequired,

};

ExchangeCarouseltem.defaultProps = {
  balance  : 0,
  showRate : false,
  disabled : false,
};

export default ExchangeCarouseltem;
