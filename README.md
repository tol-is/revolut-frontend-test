# Revolut Frontend Test

That is a take-home test for revolut, that I gloriously failed, a while ago.


## Run
- You will need node v10.10.0 but should be fine with earlier versions.

- Node version manager is recommended. https://github.com/creationix/nvm

```
  /* use node version of choice */
  nvm install 10.10
  nvm use

  yarn install
  yarn start

  /* testing */
  yarn test
  yarn test:e2e

  /* build */
  yarn build

  /* if you want to run production build locally */
  yarn global add serve
  yarn serve:build
```
