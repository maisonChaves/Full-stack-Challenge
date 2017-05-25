import {render} from 'inferno';

import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './App';
import VersionComponent from './VersionComponent';

if (module.hot) {
    require('inferno-devtools');
	require('bulma/css/bulma.css');
}

const browserHistory = createBrowserHistory();

const routes = (
	<Router history={ browserHistory }>
		<Route component={ App } />
	</Router>
);

render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}

