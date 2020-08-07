const completeOrdersReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_COMPLETE_ORDERS":
      return [...action.payload];
    default:
      return state;
  }
};

export default completeOrdersReducer;