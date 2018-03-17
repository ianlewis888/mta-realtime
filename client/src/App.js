import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Main from './components/main';
import store from './store/store';
import './styles/app.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Provider store={store}>
          <Main/>
        </Provider>
      </div>
    );
  }
}

export default App;
