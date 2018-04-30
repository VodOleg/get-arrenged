import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import Routs from './Routs';
// eslint-disable-next-line
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Routs />
    </Provider>,
    document.getElementById('root')
);

