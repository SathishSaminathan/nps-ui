import { SET_ACTIVE_DASHBOARD_TAB } from "./actionTypes";

export const setActiveDashboardTab = key => {
  return {
    type: SET_ACTIVE_DASHBOARD_TAB,
    payload: {
      key
    }
  };
};
