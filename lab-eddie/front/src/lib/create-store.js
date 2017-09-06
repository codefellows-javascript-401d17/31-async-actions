import reducer from '../reducer';
import thunk from './thunk.js';
import report from './reporter.js';
import {createStore, applyMiddleware} from 'redux';

let appStoreCreate = () =>
  createStore(reducer, applyMiddleware(thunk, report));

export default appStoreCreate;
