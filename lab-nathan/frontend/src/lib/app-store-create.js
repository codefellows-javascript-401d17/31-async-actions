import reducers from '../reducers';
import thunk from './redux-thunk.js';
import reporter from './redux-reporter.js';
import {createStore, applyMiddleware} from 'redux';

let appStoreCreate = () => createStore(reducers, applyMiddleware(thunk, reporter));

export default appStoreCreate;
