import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NukaCarousel from 'nuka-carousel';

import { DotNav } from '../helpers';

import styles from './styles.css';

class ExchangeCarousel extends PureComponent {

  constructor(props) {
    super(props);

    const currencyIndex = this.props.currencies.findIndex(c => c === this.props.selectedCurrency);
    this.state = {
      slideIndex : currencyIndex,
    };
  }

  componentDidMount() {
    this.props.onCarouselChange(this.props.selectedCurrency);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCurrency !== this.props.selectedCurrency) {
      const currencyIndex = this.props.currencies.findIndex(c => c === nextProps.selectedCurrency);
      this.setState({
        slideIndex : currencyIndex,
      });
    }
  }

  handleCarouselSlide = slideIndex => {
    this.props.onCarouselChange(this.props.currencies[slideIndex]);
    this.setState({ slideIndex });
  }

  renderDotNav({ goToSlide, currentSlide, slideCount }) {
    return (
      <DotNav
        className={styles.carousel_dot_nav}
        onClick={goToSlide}
        itemCount={slideCount}
        itemCurrent={currentSlide}
      />
    );
  }

  render() {
    return (
      <NukaCarousel
        wrapAround
        speed={100}
        easing="easeExpOut"
        edgeEasing="easeExpOut"
        slideIndex={this.state.slideIndex}
        afterSlide={this.handleCarouselSlide}
        renderBottomCenterControls={this.renderDotNav}
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
      >
        {this.props.children}
      </NukaCarousel>
    );
  }
}

ExchangeCarousel.propTypes = {
  currencies       : PropTypes.array.isRequired,
  selectedCurrency : PropTypes.string,
  onCarouselChange : PropTypes.func.isRequired,
};

export default ExchangeCarousel;
