const setWaitTimeReducer = (state = 'Processing...', action) => {
  switch (action.type) {
    case "SET_WAIT_TIME":
      return action.payload;
    default:
      return state;
  }
};

export default setWaitTimeReducer;
