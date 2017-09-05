import reducer from '../reducer.js';
import think from './redux-thunk.js';
import reporter from './redux-reporter.js';
import {createStore, applyMiddleware} from 'redux';

let appStoreCreate = () => createStore(reducer, applyMiddleware(thunk, reporter))

export deault appStoreCreate;
