import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

import configureStore from '../configureStore';
import history from '../utils/history';
import Container from '../components/Container';

const store = configureStore();

const test1 = () => <div>test1</div>;
const test2 = () => <div>test2</div>;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <ConnectedRouter history={history}>
           <Container>
            <h1>Hello World!</h1>
            <Route exact path="/" component={test1}/>
            <Route path="/test2" component={test2}/>
          </Container> 
        </ConnectedRouter> 
      </Provider>
    );
  }
}

export default App;