import axios from "axios";

import { DashboardVariables } from "constants/APIConstants";

class DashboardServices {
  service(type, data, id) {
    // const IP = "192.168.0.2:6062";
    const IP = "122.165.203.72:9094";
    switch (type) {
      case DashboardVariables.GET_DATA:
        return axios.get(`https://api.myjson.com/bins/nh1ki`);
      case DashboardVariables.GET_DASHBOARD_DATA:
        return axios.get(
          `http://${IP}/nps/api/v1/nps/chart/data?endMoney=${(data.ValueInvolved &&
            data.ValueInvolved[1]) ||
            ""}&endReceivedDate=${(data.Timeline && data.Timeline[1]) ||
            ""}&issueId=${data.Theme || ""}&productId=${data.Product ||
            ""}&eSentiment=${data.Sentiment ||
            ""}&startMoney=${(data.ValueInvolved && data.ValueInvolved[0]) ||
            ""}&startReceivedDate=${(data.Timeline && data.Timeline[0]) ||
            ""}&state=${data.State || ""}`
        );
      case DashboardVariables.GET_RAW_DATA:
        return axios.get(
          `http://122.165.203.72:9094/nps/api/v1/raw/data?pageIndex=${data}`
        );
      case DashboardVariables.GET_CHART_SUMMARY:
        return axios.get(
          "http://122.165.203.72:9094/nps/api/v1/nps/chart/summary"
        );
      case DashboardVariables.GET_STATES:
        return axios.get("http://122.165.203.72:9094/nps/api/v1/states");
      case DashboardVariables.GET_PRODUCTS:
        return axios.get("http://122.165.203.72:9094/nps/api/v1/products");
      case DashboardVariables.GET_THEMES:
        return axios.get("http://122.165.203.72:9094/nps/api/v1/issues");
      case DashboardVariables.GET_SENTIMENT:
        return axios.get("http://122.165.203.72:9094/nps/api/v1/sentiments");
      case DashboardVariables.GET_SPEEDOMETER:
        return axios.get(
          `http://122.165.203.72:9094/nps/api/v1/value?type=${data}`
        );
      case DashboardVariables.GET_VOC:
        return axios.get(`http://122.165.203.72:9094/nps/api/v1/voc/chart`);
    }
  }
}

export default DashboardServices;
