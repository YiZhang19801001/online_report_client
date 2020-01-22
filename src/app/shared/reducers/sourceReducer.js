export default (source = "", action) => {
    switch (action.type) {
        case "setSource":
            return action.payload;

        default:
            return source;
    }
};
