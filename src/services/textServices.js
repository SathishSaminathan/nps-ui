import axios from "axios";

import { TextAnalyticsVariables } from "constants/APIConstants";

class TextServices {
  service(type, data, id) {
    switch (type) {
      case TextAnalyticsVariables.GET_DATA:
        return axios.get(`https://api.myjson.com/bins/nh1ki`);
    }
  }
}

export default TextServices;
