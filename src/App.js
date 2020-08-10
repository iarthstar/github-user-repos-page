import React from 'react';
import { Provider } from 'react-redux'
import { store } from './Redux';

import './App.css';

import Select from './Commons/Inputs/Select';
import Repositories from './Pages/Repositories';

const App = () => {
  return (
    <Provider store={store}>
      <Repositories />
    </Provider>
  );
}

export default App;