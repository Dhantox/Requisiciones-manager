import { createStore, combineReducers } from 'redux';
import authenticationReducer from './common/features/Authentication/authenticationReducer';
import clientesReducer from './common/features/Clientes/clientesReducer';

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({
      authenticationReducer,
      clientes: clientesReducer
    }),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
