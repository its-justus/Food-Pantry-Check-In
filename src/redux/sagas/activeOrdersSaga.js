import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchActiveOrders() {
  try {
    const response = yield axios.get('/api/order/active');
    yield put({ type: 'SET_ACTIVE_ORDERS', payload: response.data });
  } catch (error) {
    console.log('Order get request failed', error);
  }
}

function* activeOrdersSaga() {
  yield takeLatest('FETCH_ACTIVE_ORDERS', fetchActiveOrders);
}

export default activeOrdersSaga;
