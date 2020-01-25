import React from "react";
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";

import rootReducer from './reducers';
import App from "./containers/App";

import "./styles/styles.css";

import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fireBaseConfig from './config/fireBaseConfig'

//const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })];
//if (process.env.NODE_ENV !== 'production') {
//    middleware.push(createLogger())
//}

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reactReduxFirebase(fireBaseConfig),
        reduxFirestore(fireBaseConfig)
    )
);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
