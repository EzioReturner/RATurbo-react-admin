import React from 'react';
import ReactDOM from 'react-dom';
import '@style/index.scss';
import { observer, Provider } from 'mobx-react';
// import * as serviceWorker from '../pwa/serviceWorker';
import { Store } from '@store';
import RenderRoutes from '@components/RenderRoutes/Index';

ReactDOM.render(
	<Provider {...Store}>
		<RenderRoutes />
	</Provider>,
	document.getElementById('root')
);

// serviceWorker.register();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
