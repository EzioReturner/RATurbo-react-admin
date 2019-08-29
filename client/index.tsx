import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Store } from '@store';
import RenderRoutes from '@components/RenderRoutes';
import '@styles/index.scss';

ReactDOM.render(
  <Provider {...Store}>
    <RenderRoutes />
  </Provider>,
  document.getElementById('root')
);
