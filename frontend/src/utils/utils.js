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
