import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* checkOutOrder(action) {
  try {
    // Add a checkout time of now (on the server) for the input order.
    yield axios.put(`/api/order/checkout/${action.payload}`);
    // Get the active and complete orders again because we just changed one.
    yield put({ type: 'FETCH_ACTIVE_ORDERS' });
    yield put({ type: 'FETCH_COMPLETE_ORDERS' });
  } catch (error) {
    console.log('Update checkout time failed', error);
  }
}

function* checkOutOrderSaga() {
  yield takeEvery('ORDER_CHECKOUT', checkOutOrder);
}

export default checkOutOrderSaga;
