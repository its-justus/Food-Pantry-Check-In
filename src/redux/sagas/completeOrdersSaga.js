import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCompleteOrders() {
  try {
    const response = yield axios.get('/api/order/complete/today');
    yield put({ type: 'SET_COMPLETE_ORDERS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FAILED_REQUEST' });
    console.log('Order get request failed', error);
  }
}

function* activeOrdersSaga() {
  yield takeLatest('FETCH_COMPLETE_ORDERS', fetchCompleteOrders);
}

export default activeOrdersSaga;
