const activeOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ACTIVE_ORDERS":
      return action.payload;
    default:
      return state;
  }
};

export default activeOrdersReducer;