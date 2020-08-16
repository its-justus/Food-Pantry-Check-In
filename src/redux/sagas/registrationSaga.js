import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: "CLEAR_REGISTRATION_ERROR" });

    // passes the username and password from the payload to the server
    yield axios.post("/api/account", action.payload);

    // automatically log a user in after registration
    yield put({ type: "LOGIN", payload: { username: action.payload.email, password: action.payload.password } });

    // Set this message so the registration page knows to redirect but it isn't actually shown currently.
    yield put({ type: "DISPLAY_SUCCESSFUL_REGISTRATION_MESSAGE" });
    yield put({ type: "SET_TO_LOGIN_MODE" });
  } catch (error) {
    console.log("Error with user registration:", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}

function* registrationSaga() {
  yield takeLatest("REGISTER", registerUser);
}

export default registrationSaga;
