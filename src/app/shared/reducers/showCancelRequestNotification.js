export default (showCancelRequestNotification = false, action) => {
    switch (action.type) {
        case "closeCancelNotificationCenter":
            return false;
        case "ShowCancelRequestNotification":
            return true;
        default:
            return showCancelRequestNotification;
    }
};
