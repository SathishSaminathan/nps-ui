export const numberOnly = event => {
  let number = event.target.value.replace(/[^0-9]/g, "");
  event.target.value = number;
  return event;
};
