import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import createStore from '../../lib/create-store.js';
import Dashboard from '../dashboard';

const store = createStore();


class App extends React.Component {
  constructor(props) {
    super(props);
  }

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
