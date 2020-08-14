const setWaitTimeReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PARKING_LOCATIONS":
      return action.payload;
    default:
      return state;
  }
};

export default setWaitTimeReducer;
