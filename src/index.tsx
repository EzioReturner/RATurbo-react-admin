import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import RenderRoutes from '@components/RenderRoutes';
import { Store } from '@store/index';
import '@styles/index.less';

const App = () => (
  <Provider {...Store}>
    <RenderRoutes />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
