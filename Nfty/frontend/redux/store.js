import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './reducers/auth.reducer';

const reducers = combineReducers({
	auth: authReducer
});
  
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));  

export default store;