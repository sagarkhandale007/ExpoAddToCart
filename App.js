import React from 'react';
import { CartProvider } from './context/CartContext.js';
import Navigation from './components/Navigation';
import { createStore, combineReducers } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import loginReducer from './loginState/store/reducers/UserSession.js'

function App() {

let store;

  const rootReducer = combineReducers(
    {
      login: loginReducer,
    }
  );
  store = createStore(rootReducer);

  return (

    <Provider store={store}>

    <CartProvider> 

    <Navigation>
    </Navigation>

    </CartProvider> 

  </Provider>

  );
}

export default App;
