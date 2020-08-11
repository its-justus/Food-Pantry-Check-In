import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import registrationSaga from "./registrationSaga";
import accountSaga from "./accountSaga";
import activeOrdersSaga from "./activeOrdersSaga";
import completeOrdersSaga from "./completeOrdersSaga"
import checkOutOrderSaga from './checkOutOrderSaga';
import orderSaga from './orderSaga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    accountSaga(),
    activeOrdersSaga(),
    completeOrdersSaga(),
    checkOutOrderSaga(),
    orderSaga()
  ]);
}
