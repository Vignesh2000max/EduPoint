import React, { Component } from 'react';
import Store from './redux/configureStore';
import {BrowserRouter, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './Components/Main';


class App extends Component {
  render() {
     return (
        <Provider store={Store}>
          <BrowserRouter>
          <Switch>
            <Main />
          </Switch>
              
          </BrowserRouter>
        </Provider>
      );
  }
}

export default App;
