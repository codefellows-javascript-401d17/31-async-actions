import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../reducer';
import reporter from '../../lib/redux-reporter.js';
import thunk from '../../lib/redux-thunk.js'

import Dashboard from '../dashboard';


const store = createStore(reducer, applyMiddleware(thunk, reporter));

class App extends React.Component {
  render() {
    return (
      <main className='app'>
        <Provider store={store}>
          <BrowserRouter>
            <Route exact path='/' component={Dashboard} />
          </BrowserRouter>
        </Provider>
      </main>
    )
  }
}

export default App;