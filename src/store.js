import { createStore, combineReducers } from 'redux';
import projectReducer from './common/features/Projects/projectReducer';
import pomodoroReducer from './common/features/MainScreen/pomodoroReducer';
import authenticationReducer from './common/features/Authentication/authenticationReducer';

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({ projectReducer, pomodoroReducer, authenticationReducer }),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
