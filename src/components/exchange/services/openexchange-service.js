import transformResults from './transform-results';

/**
 * fetch rates
 */
export const fetchLatest = ({ symbols }) => {

  const queryParams = [
    `app_id=${process.env.REACT_APP_OPENEX_APP_ID}`,
    `symbols=${symbols}`,
  ];

  return new Promise((resolve, reject) => {
    fetch(
      `${process.env.REACT_APP_EXCHANGE_URL}?${queryParams.join('&')}`,
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
