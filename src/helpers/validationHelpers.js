export const numberOnly = event => {
  let number = event.target.value.replace(/[^0-9]/g, "");
  event.target.value = number;
  return event;
};

export const getRandomColors = (data, type) => {
  switch (type) {
    case "DOUGHNUT":
      data.datasets[0].backgroundColor = data.datasets[0].data.map(
        datum => `#${Math.floor(Math.random() * 16777215).toString(16)}`
      );
      return data;

    case "PIE":
      data.datasets[0].backgroundColor = data.datasets[0].data.map(
        datum => `#${Math.floor(Math.random() * 16777215).toString(16)}`
      );
      return data;

    case "BAR":
      data.datasets[0].backgroundColor = "#79c447";
      data.datasets[1].backgroundColor = "#f5222d";
      return data;

    default:
      break;
  }
};