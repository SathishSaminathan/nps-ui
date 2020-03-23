import { combineReducers } from "redux";
import { SET_ACTIVE_DASHBOARD_TAB } from "store/actions/actionTypes";

const activeTabInitialState = {
  activeDashboardTab: "1"
};

const setActiveTabReducer = (state = activeTabInitialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_DASHBOARD_TAB:
      return {
        ...state,
        activeDashboardTab: action.payload.key
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  activeTab: setActiveTabReducer
});

export default rootReducer;
