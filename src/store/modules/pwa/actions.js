import {
  SET_VISIBILITY,
  SET_CONNECTIVITY,
} from "./types";

export const setVisibility = visible => ({
  type    : SET_VISIBILITY,
  payload : visible,
});

export const setConnectivity = online => ({
  type    : SET_CONNECTIVITY,
  payload : online,
});
