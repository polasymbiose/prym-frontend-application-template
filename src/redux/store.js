import { combineReducers, createStore } from 'redux'
import { inputReducer } from './input/reducer'
import { signUpReducer } from './signUp/reducer'
import { loadStorage, saveStorage } from './storage'

const rootReducer = combineReducers({
  signUp: signUpReducer,
  input: inputReducer,
})

const persistedState = loadStorage()

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
store.subscribe(() => {
  saveStorage({
    input: store.getState().input
  });
});


export { store }
