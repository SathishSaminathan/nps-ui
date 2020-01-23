import { notification, message } from "antd";
import { Notifications } from "constants/APIConstants";

export const showNotifications = (
  type,
  title = "Please give Notification Title ",
  message = "Get your work simplified!!"
) => {
  notification.config({
    duration: 6
  });
  notification[type]({
    message: title,
    description: message,
    style: {
      width: 400
    }
  });
};

export const showActionMessage = (type, text = "Loading") => {
  switch (type) {
    case Notifications.SHOW:
      message.loading(text, 0);
      break;
    case Notifications.HIDE:
      message.destroy();
      break;
    case Notifications.SUCCESS:
      message.success(text);
      break;
    case Notifications.WARNING:
      message.warning(text);
      break;
    case Notifications.ERROR:
      message.error(text);
    default:
      break;
  }
};
