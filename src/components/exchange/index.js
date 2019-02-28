import exchangeServices from './services';
import withReduxState from './hocs/with-redux-state';
import ExchangeLayout from './components/exchange-layout';
//
import { reducer as accountsReducer } from './store/accounts';
import { reducer as ratesReducer } from './store/rates';
import { reducer as exchangeReducer } from './store/exchange';


const reducers = { ratesReducer, exchangeReducer, accountsReducer };
export { ExchangeLayout, exchangeServices, reducers };

export default withReduxState(ExchangeLayout);
