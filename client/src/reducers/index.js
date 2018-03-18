import * as stations from '../data/stations.json';
import * as defaultArrivalFilters from '../data/default_arrival_filters.json';

import {
  SET_ARRIVALS_LOAD_STATE,
  INITIALIZE_FIREBASE,
  SET_CURRENT_STATION,
  RECEIVE_ARRIVAL_DATA,
  UPDATE_TIMESTAMP,
  SET_TIMESTAMP_INTERVAL,
  TOGGLE_MENU_STATE,
  RESET_MENU_STATE,
  SET_ARRIVAL_FILTERS,
  SET_DEFAULT_ARRIVAL_FILTERS,
  SET_INITIAL_ARRIVALS,
  SET_UPDATE_INTERVAL
} from '../actions/actions.js'

const initialState = {
  stationList: stations,
  firebaseInitState: false,
  arrivalData: { arrivals: [] },
  arrivalsLoadState: false,
  initialLoadState: true,
  currentStation: null,
  timestamp: Date.now() / 1000,
  timestampInterval: false,
  updateInterval: false,
  arrivalFilters: defaultArrivalFilters,
  menuState: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ARRIVALS_LOAD_STATE:
      return { ...state, arrivalsLoadState: action.payload };

    case INITIALIZE_FIREBASE:
      return { ...state, firebaseInitState: action.payload };

    case SET_CURRENT_STATION:
      return { ...state, currentStation: action.payload };

    case RECEIVE_ARRIVAL_DATA:
      return { ...state, arrivalData: action.payload };

    case UPDATE_TIMESTAMP:
      return { ...state, timestamp: action.payload };

    case SET_TIMESTAMP_INTERVAL:
      return { ...state, timestampInterval: action.payload };

    case TOGGLE_MENU_STATE:
      return { ...state, menuState: !state.menuState };

    case RESET_MENU_STATE:
        return { ...state, menuState: false };

    case SET_ARRIVAL_FILTERS:
      return {
        ...state,
        arrivalFilters: {
          ...state.arrivalFilters,
          ...action.payload
      }
    };

    case SET_DEFAULT_ARRIVAL_FILTERS:
      return { ...state, arrivalFilters: action.payload };

    case SET_INITIAL_ARRIVALS:
      const loadState = (action.payload === "success" || action.payload === "up-to-date") ? false : "error";
      return { ...state, initialLoadState: loadState };

    case SET_UPDATE_INTERVAL:
      return { ...state, updateInterval: action.payload };

    default:
      return state;
  }
}
export default rootReducer;
