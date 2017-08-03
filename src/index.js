import React from 'react';
import { render as renderDOM } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './containers/App';

// Import css
import 'normalize.css/normalize.css';
import './styles.default.scss';

renderDOM(<App/>, document.getElementById('root'));

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    renderDOM(<AppContainer><NextApp/></AppContainer>, document.getElementById('root'));
  });
}