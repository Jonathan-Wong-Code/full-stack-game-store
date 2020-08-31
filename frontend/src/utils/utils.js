import { Provider } from 'react-redux';
import React from 'react';
import { createStore } from 'redux';
import { node } from 'prop-types';
import reducers from '../reducers';

export const formatPricing = (price, decimals) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals
  });

  return formatter.format(price);
};

export const formatPercentage = (numerator, denominator) =>
  (numerator / denominator).toFixed(2) * 100;

export const renderArrayText = array => {
  return array.map((text, i) => ` ${text}${i === array.length - 1 ? '' : ','}`);
};

// STORYBOOK PROVIDER

export const ProviderWrapper = ({ story }) => {
  const store = createStore(reducers);

  return <Provider store={store}>{story}</Provider>;
};

ProviderWrapper.propTypes = {
  story: node.isRequired
};
