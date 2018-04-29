import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import Routs from './Routs';
// eslint-disable-next-line
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers/index';
import { Provider } from 'react-redux';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Routs />
    </Provider>,
    document.getElementById('root')
);
//ReactDOM.render(<Routs />, document.getElementById('root'));
registerServiceWorker();

