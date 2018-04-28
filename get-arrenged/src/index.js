import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

