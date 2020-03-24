import axios from "axios";

import { DashboardVariables } from "constants/APIConstants";

class DashboardServices {
  service(type, data, id) {
    // const IP = "192.168.0.2:6062";
    const IP = "http://122.165.203.72:9094/nps/api/v1/";
    // const IP = "http://122.165.203.72:9094/nps/api/v1/";
    switch (type) {
      case DashboardVariables.GET_DATA:
        return axios.get(`https://api.myjson.com/bins/nh1ki`);
      case DashboardVariables.GET_DASHBOARD_DATA:
        return axios.get(
          `${IP}nps/chart/data?endMoney=${(data.ValueInvolved &&
            data.ValueInvolved[1]) ||
            ""}&endReceivedDate=${(data.Timeline && data.Timeline[1]) ||
            ""}&issueId=${data.Theme || ""}&productId=${data.Product ||
            ""}&eSentiment=${data.Sentiment ||
            ""}&startMoney=${(data.ValueInvolved && data.ValueInvolved[0]) ||
            ""}&startReceivedDate=${(data.Timeline && data.Timeline[0]) ||
            ""}&state=${data.State || ""}`
        );
      case DashboardVariables.GET_RAW_DATA:
        return axios.get(`${IP}raw/data?pageIndex=${data}`);
      case DashboardVariables.GET_CHART_SUMMARY:
        return axios.get(`${IP}nps/chart/summary`);
      case DashboardVariables.GET_STATES:
        return axios.get(`${IP}states`);
      case DashboardVariables.GET_PRODUCTS:
        return axios.get(`${IP}products`);
      case DashboardVariables.GET_THEMES:
        return axios.get(`${IP}issues`);
      case DashboardVariables.GET_SENTIMENT:
        return axios.get(`${IP}sentiments`);
      case DashboardVariables.GET_SPEEDOMETER:
        return axios.get(`${IP}value?type=${data}`);
      case DashboardVariables.GET_VOC:
        return axios.get(`${IP}voc/chart`);
      case DashboardVariables.FEEDBACK_SERVICE:
        return axios.get(`${IP}feedback/summary?feedbackCategory=${data}`);
      case DashboardVariables.COMPARISION_CHART:
        return axios.get(
          `${IP}compare/summary?${
            data.comparisionMonth
              ? `comparisionMonth=${data.comparisionMonth}`
              : ""
          }&isProduct=${data.isProduct}${
            data.productId ? `&productId=${data.productId}` : ""
          }`
        );
      case DashboardVariables.COMPARISION_CHART_PRODUCT_DD:
        return axios.get(
          `${IP}top/products?limit=5&yearly=${data.comparisionMonth}`
        );
      case DashboardVariables.PREDICTION:
        return axios.get(`${IP}prediction/summary`);
      case DashboardVariables.CUSTOMER_DETAILS:
        return axios.get(
          `${IP}customers?productId=${data.productId}&pageIndex=${data.pageIndex}`
        );
    }
  }
}

export default DashboardServices;
