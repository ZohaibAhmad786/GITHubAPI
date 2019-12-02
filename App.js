import React from 'react';
import { Provider } from 'react-redux';
import GitNavigator from './navigation/GitNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import searchUserReducer from './store/reducers/SearchUsers';
import formReducer from './store/reducers/FormData'

const rootReducer = combineReducers({
  SearchUsers: searchUserReducer,
  formData:formReducer
});


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  return (
    <Provider
      store={store}
    >
      <GitNavigator />
    </Provider>
  );
}


