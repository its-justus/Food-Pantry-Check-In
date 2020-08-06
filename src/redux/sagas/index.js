import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import registrationSaga from "./registrationSaga";
import accountSaga from "./accountSaga"
import orderSaga from "./orderSaga"

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    accountSaga(),
    orderSaga(),
  ]);
}