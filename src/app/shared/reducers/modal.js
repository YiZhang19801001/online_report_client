export default (showModal = false, action) => {
  switch (action.type) {
    case "closeModal":
      return false;
    case "openModal":
    case "setDateForDailyReport":
      return true;
    default:
      return showModal;
  }
};
