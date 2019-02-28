import initialState from './initial-state';
import {
  SET_VISIBILITY,
  SET_CONNECTIVITY,
} from "./types";

export default (state = initialState, action = {}) => {
  switch (action.type) {
    /* Case Tab Visibility */
    case SET_VISIBILITY :
      return {
        ...state,
        visible : action.payload,
      };

    /* Case App Connectivity */
    case SET_CONNECTIVITY :
      return {
        ...state,
        online : action.payload,
      };

    /* Default */
    default :
      return state;
  }
};
