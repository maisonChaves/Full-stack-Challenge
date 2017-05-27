import {render} from 'inferno';

import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './App';
import LoginForm from './LoginForm';

if (module.hot) {
    require('inferno-devtools');
	require('bulma/css/bulma.css');
}

const browserHistory = createBrowserHistory();

const routes = (
	<Router history={ browserHistory }>
		<Route component={ 	App }>
			<Route path="/" component={ LoginForm } fb={FB} />
		</Route>
	</Router>
);

render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}

