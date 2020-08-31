import { Provider } from 'react-redux';
import React from 'react';

import { configureStore } from '../store';

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

// STORYBOOK

const store = configureStore();

export const ProviderWrapper = ({ children }) => {
  const { store } = configureStore();
  return <Provider store={store}>{children}</Provider>;
};

export const WithProvider = story => (
  <ProviderWrapper store={store}>{story()}</ProviderWrapper>
);
