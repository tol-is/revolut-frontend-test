
const mockUser = {
  id       : "a1b2c3",
  accounts : {
    GBP : 12245.00,
    USD : 2221.00,
    EUR : 176.98,
  },
};

export const fetchBalances = userId => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      balances : { ...mockUser.accounts },
    });
  }, 400);
});


export const exchangeCurrency =
  ({ currencySource, currencyDestination, amount, direction, exchangeRate }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        // compute amount to take off the source currency balance
        const amountSourceSubtract = direction === 'send' ?
          amount :
          amount * exchangeRate;
        // compute amount to add to the destination currency balance
        const amountDestinationAdd = direction === 'receive' ?
          amount :
          amount * exchangeRate;

        // edit mock user object
        mockUser.accounts[currencySource] = mockUser.accounts[currencySource] - amountSourceSubtract;
        mockUser.accounts[currencyDestination] = mockUser.accounts[currencyDestination] + amountDestinationAdd;

        // resolve promise with balances
        resolve({
          balances : {
            ...mockUser.accounts,
          },
        });

      }, 400);
    });
