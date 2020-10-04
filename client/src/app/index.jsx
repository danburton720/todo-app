import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './configureStore';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import 'regenerator-runtime/runtime';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'));