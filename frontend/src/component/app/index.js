import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStoreCreate from '../../lib/app-create-store';

const store = appStoreCreate();

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
          <BrowserRouter>
            <main>
              <h1>cool beans</h1>
            </main>

          </BrowserRouter>
        </Provider>
      </div>
    )
  }
}

export default App;