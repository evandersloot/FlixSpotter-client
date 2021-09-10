import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

// Import statement to indicate you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class FlixSpotterApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="main-container">
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in root DOM element
ReactDOM.render(React.createElement(FlixSpotterApplication), container);