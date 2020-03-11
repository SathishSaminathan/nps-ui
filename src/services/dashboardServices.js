import axios from "axios";

import { DashboardVariables } from "constants/APIConstants";

class DashboardServices {
  service(type, data, id) {
    switch (type) {
      case DashboardVariables.GET_DATA:
        return axios.get(`https://api.myjson.com/bins/nh1ki`);
      case DashboardVariables.GET_DASHBOARD_DATA:
        return axios.get(
          `http://122.165.203.72:9094/nps/api/v1/nps/chart/data?endMoney=${(data.ValueInvolved &&
            data.ValueInvolved[1]) ||
            ""}&endReceivedDate=${(data.Timeline && data.Timeline[1]) ||
            ""}&issue=${data.Theme || ""}&product=${data.Product ||
            ""}&sentiment=${data.Sentiment || ""}&startMoney=${data
            .ValueInvolved&& data
            .ValueInvolved[0] || ""}&startReceivedDate=${data.Timeline && data.Timeline[0] ||
            ""}&state=${data.State || ""}`
        );
      case DashboardVariables.GET_RAW_DATA:
        return axios.get("http://122.165.203.72:9094/nps/api/v1/raw/data");
      case DashboardVariables.GET_STATES:
        return axios.get("http://122.165.203.72:9094/nps/api/v1/states");
      case DashboardVariables.GET_PRODUCTS:
        return axios.get("http://122.165.203.72:9094/nps/api/v1/products");
      case DashboardVariables.GET_THEMES:
        return axios.get("http://122.165.203.72:9094/nps/api/v1/issues");
      case DashboardVariables.GET_SENTIMENT:
        return axios.get("http://122.165.203.72:9094/nps/api/v1/sentiments");
    }
  }
}

export default DashboardServices;
