import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import ReduxThunk from 'redux-thunk'
import rootReducer from "../reducers/index.js";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));
export default store;
