
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const getDiscountedPrice = (price: number, discount: number): number => {
  return Math.round(price - (price * discount / 100));
};
