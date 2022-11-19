export const toMoney = (num, currency) => {
  return currency + " " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
