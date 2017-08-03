import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import history from '../utils/history';

export default [ 
  thunk,
  routerMiddleware(history),
];