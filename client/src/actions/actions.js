import * as firebase from 'firebase';
import config from '../data/firebase_config';
import * as defaultArrivalFilters from '../data/default_arrival_filters.json';

/*
 * Action Types
 */

export const SET_LOAD_STATE = "SET_LOAD_STATE";
export const INITIALIZE_FIREBASE = "INITIALIZE_FIREBASE";
export const SET_CURRENT_STATION = "SET_CURRENT_STATION";
export const RECEIVE_ARRIVAL_DATA = "RECEIVE_ARRIVAL_DATA";
export const UPDATE_TIMESTAMP = "UPDATE_TIMESTAMP";
export const SET_TIMESTAMP_INTERVAL = "SET_TIMESTAMP_INTERVAL";
export const TOGGLE_MENU_STATE = "TOGGLE_MENU_STATE";
export const RESET_MENU_STATE = "RESET_MENU_STATE";
export const SET_ARRIVAL_FILTERS = "SET_ARRIVAL_FILTERS";
export const SET_DEFAULT_ARRIVAL_FILTERS = "SET_DEFAULT_ARRIVAL_FILTERS";

/*
 * Action Creators
 */

export const setCurrentLoadState = (loadState) => {
  return {
    type: SET_LOAD_STATE,
    payload: loadState
  };
}

export const intitializeFirebase = () => {
  firebase.initializeApp(config);
  return {
    type: INITIALIZE_FIREBASE,
    payload: true
  };
}

export const setCurrentStation = (complexId) => {
  return dispatch => {
    dispatch(setCurrentLoadState(true));
    dispatch({ type: SET_CURRENT_STATION, payload: complexId })
    const ref = firebase.database().ref(`arrivals/${complexId}`);
    ref.on("value", snapshot => {
      dispatch({ type: RECEIVE_ARRIVAL_DATA, payload: snapshot.val() });
      dispatch(setCurrentLoadState(false));
    });
  }
}

export const removeCurrentStation = (complexId) => {
  return dispatch => {
    dispatch(setCurrentLoadState(true));
    dispatch({ type: SET_CURRENT_STATION, payload: null })
    const ref = firebase.database().ref(`arrivals/${complexId}`);
    ref.off();
    dispatch({ type: RECEIVE_ARRIVAL_DATA, payload: { arrivals: [] } });
    dispatch(setCurrentLoadState(false));
  }
}

export const updateTimestamp = () => {
  return {
    type: UPDATE_TIMESTAMP,
    payload: Date.now() / 1000
  };
}

export const setTimestampInterval = () => {
  return dispatch => {
    return {
      type: SET_TIMESTAMP_INTERVAL,
      payload: setInterval(() => {
        dispatch(updateTimestamp());
      }, 5000)
    };
  };
}

export const toggleMenuState = () => {
  return {
    type: TOGGLE_MENU_STATE,
    payload: ""
  }
}

export const resetMenuState = () => {
  return {
    type: RESET_MENU_STATE,
    payload: ""
  }
}

export const setArrivalFilters = (af) => {
    return {
      type: SET_ARRIVAL_FILTERS,
      payload: af
    };
}

export const setDefaultArrivalFilters = () => {
  return {
    type: SET_DEFAULT_ARRIVAL_FILTERS,
    payload: defaultArrivalFilters
  };
}
