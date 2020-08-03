import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import registrationSaga from "./registrationSaga";
import accountSaga from "./accountSaga"

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    accountSaga(),
  ]);
}