import { hot } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'mobx-react';
import RenderRoutes from '@components/RenderRoutes';
import { Store } from '@store/index';
import '@styles/index.scss';

const App = () => (
  <Provider {...Store}>
    <RenderRoutes />
  </Provider>
);

export default process.env.NODE_ENV === 'development' ? hot(module)(App) : App;
