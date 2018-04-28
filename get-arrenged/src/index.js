import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Routs from './Routs';
import Home from './Home';

ReactDOM.render(<Home />, document.getElementById('root'));
ReactDOM.render(<Routs />, document.getElementById('root'));
registerServiceWorker();

