import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

// here we import tachyons as a package from our node_modules folder
import 'tachyons';
import './css/main.css';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

import mixesApp from './store';

// https://gist.githubusercontent.com/gosseti/ace239d5e53a080f81841cb8c5f6779c/raw/0adfc3deb2b821f093f2a8516cd139ba97b8bf2b/index.js
let store = createStore(
  mixesApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
