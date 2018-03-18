import * as firebase from 'firebase';
import * as axios from 'axios';
import config from '../data/firebase_config';
import * as defaultArrivalFilters from '../data/default_arrival_filters.json';

const apiUrl = (process.env.NODE_ENV === "production")
  ? process.env.HEROKU_URL : "http://localhost:5000/api/arrivals";

/*
 * Action Types
 */

export const SET_ARRIVALS_LOAD_STATE = "SET_ARRIVALS_LOAD_STATE";
export const INITIALIZE_FIREBASE = "INITIALIZE_FIREBASE";
export const SET_CURRENT_STATION = "SET_CURRENT_STATION";
export const RECEIVE_ARRIVAL_DATA = "RECEIVE_ARRIVAL_DATA";
export const UPDATE_TIMESTAMP = "UPDATE_TIMESTAMP";
export const SET_TIMESTAMP_INTERVAL = "SET_TIMESTAMP_INTERVAL";
export const TOGGLE_MENU_STATE = "TOGGLE_MENU_STATE";
export const RESET_MENU_STATE = "RESET_MENU_STATE";
export const SET_ARRIVAL_FILTERS = "SET_ARRIVAL_FILTERS";
export const SET_DEFAULT_ARRIVAL_FILTERS = "SET_DEFAULT_ARRIVAL_FILTERS";
export const SET_INITIAL_ARRIVALS = "SET_INITIAL_ARRIVALS";
export const UPDATE_DB = "UPDATE_DB";
export const SET_UPDATE_INTERVAL = "SET_UPDATE_INTERVAL";

/*
 * Action Creators
 */

export const setArrivalsLoadState = (loadState) => {
  return {
    type: SET_ARRIVALS_LOAD_STATE,
    payload: loadState
  };
}

export const setCurrentStation = (complexId) => {
  return dispatch => {
    dispatch(setArrivalsLoadState(true));
    dispatch({ type: SET_CURRENT_STATION, payload: complexId })
    const ref = firebase.database().ref(`arrivals/${complexId}`);
    ref.on("value", snapshot => {
      const data = snapshot.val();
      const payload = (data !== null) ? data : [];
      dispatch({ type: RECEIVE_ARRIVAL_DATA, payload: payload });
      dispatch(setArrivalsLoadState(false));
    });
  }
}

export const removeCurrentStation = (complexId) => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_STATION, payload: null })
    const ref = firebase.database().ref(`arrivals/${complexId}`);
    ref.off();
    dispatch({ type: RECEIVE_ARRIVAL_DATA, payload: { arrivals: [] } });
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
    setInterval(() => {
      dispatch(updateTimestamp());
    }, 5000);
    dispatch({
      type: SET_TIMESTAMP_INTERVAL,
      payload: true
    });
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

export const setArrivalFilters = (arrivalFilters) => {
    return {
      type: SET_ARRIVAL_FILTERS,
      payload: arrivalFilters
    };
}

export const setDefaultArrivalFilters = () => {
  return {
    type: SET_DEFAULT_ARRIVAL_FILTERS,
    payload: defaultArrivalFilters
  };
}

export const setUpdateInterval = () => {
  return dispatch => {
    setInterval(() => {
      dispatch(updateDB());
    }, 30000);
    dispatch({
      type: SET_UPDATE_INTERVAL,
      payload: true
    });
  };
}

export const setInitialArrivals = () => {
  return dispatch => {
    axios.get(apiUrl).then(res => {
      if (res.data.updateStatus === "success") {
        dispatch({
          type: SET_INITIAL_ARRIVALS,
          payload: res.data.updateStatus
        });
        dispatch(setUpdateInterval());
      }
    });
  }
}

export const updateDB = () => {
  return dispatch => {
    axios.get(apiUrl).then(res => {
      if (res.data.updateStatus.error) { console.error(res.data.updateStatus.error) }
      dispatch({
        type: UPDATE_DB,
        payload: res.data.updateStatus
      });
    });
  }
}

export const intitializeFirebase = () => {
  firebase.initializeApp(config);
  return {
    type: INITIALIZE_FIREBASE,
    payload: true
  };
}
