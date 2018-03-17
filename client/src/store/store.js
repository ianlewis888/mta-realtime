import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import ReduxThunk from 'redux-thunk'
import rootReducer from "../reducers/index.js";

const middleware = (process.env.NODE_ENV === "development")
  ? [ReduxThunk, logger] : [ReduxThunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));
export default store;
