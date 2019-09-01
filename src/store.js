import { createStore, combineReducers } from 'redux';
import projectReducer from './common/features/Projects/projectReducer';
import pomodoroReducer from './common/features/MainScreen/pomodoroReducer';

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({ projectReducer, pomodoroReducer }),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
