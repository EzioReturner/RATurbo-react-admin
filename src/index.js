import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Store } from 'store';
// import RenderRoutes from 'components/RenderRoutes';
import RoutesRender from 'components/RoutesRender';
import * as serviceWorker from './serviceWorker';
import 'style/index.scss';

ReactDOM.render(
	<Provider {...Store}>
		<RoutesRender />
	</Provider>,
	document.getElementById('root')
);

serviceWorker.register();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
