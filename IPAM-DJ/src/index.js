import React from "react";
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";

import rootReducer from './reducers'
import App from "./containers/App"

import "./styles/styles.css";

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
