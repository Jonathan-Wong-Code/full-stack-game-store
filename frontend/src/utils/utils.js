import axios from 'axios';

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
