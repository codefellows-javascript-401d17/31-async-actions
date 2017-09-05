import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import appStoreCreate from '../../lib/app-create-store.js';
import Dashboard from '../dashboard';

const store = appStoreCreate();

class App extends React.Component {
  render() {
    return (
      <main className='app'>
        <provider store={store}>
          <BrowserRouter>
            <section>
              <Route exact path='/' component={Dashboard}>
            </section>
          </BrowserRouter>
        </provider>
      </main>
    )
  }
}

export default App;
