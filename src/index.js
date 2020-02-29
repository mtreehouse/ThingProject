import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './client/css/index.css';
import Root from './client/Root';
import * as serviceWorker from './client/serviceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();