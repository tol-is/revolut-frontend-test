import transformResults from './transform-results';

export const fetchLatest = ({ symbols }) => {
  const queryParams = [
    `base=USD`,
    `symbols=${symbols}`,
  ];
  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.REACT_APP_EXCHANGEAPI_URL}?${queryParams.join('&')}`,
      { method : 'GET' },
    )
      .then(res => res.json())
      .then(response => {
        response.error ?
          reject(response) :
          resolve(transformResults(response));
      });
  });
};


