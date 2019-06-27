export default (showUserCenter = false, action) => {
  switch (action.type) {
    case "closeUserCenter":
      return false;
    case "showUserCenter":
      return true;
    default:
      return showUserCenter;
  }
};
