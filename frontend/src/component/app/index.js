import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <main>
            <h1>cool beans</h1>
          </main>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;