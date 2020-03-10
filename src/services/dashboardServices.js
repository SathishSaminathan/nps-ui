import axios from "axios";

import { DashboardVariables } from "constants/APIConstants";

class DashboardServices {
  service(type, data, id) {
    switch (type) {
      case DashboardVariables.GET_DATA:
        return axios.get(`https://api.myjson.com/bins/nh1ki`);
      case DashboardVariables.GET_DASHBOARD_DATA:
        return axios.get(
          "http://122.165.203.72:9094/nps/api/v1/nps/chart/data"
        );
    }
  }
}

export default DashboardServices;
