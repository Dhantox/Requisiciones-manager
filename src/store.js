import { createStore, combineReducers } from 'redux';
import projectReducer from './common/features/Projects/projectReducer';

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({ projectReducer }),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
