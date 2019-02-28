import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader  : () => import('./ExchangeRoute'),
  loading : () => null,
});

export default LoadableComponent;
