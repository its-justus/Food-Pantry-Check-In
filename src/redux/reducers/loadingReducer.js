const setWaitTimeReducer = (state = true, action) => {
  switch (action.type) {
    case "SET_SERVER_LOADING":
      return true;
    case "CLEAR_SERVER_LOADING":
      return false;
    default:
      return state;
  }
};

export default setWaitTimeReducer;
