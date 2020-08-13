import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* submitCheckIn(action) {
  try {
    yield axios.post('/api/order', action.payload);
  } catch (error) {
    yield put({ type: 'SET_ORDER_PLACEMENT_ERROR' });
    console.log('User get request failed', error);
  }
}

function* fetchWaitTime() {
  try {
    const response = yield axios.get('/api/order/client-order-status');
    // Processing...
    yield put({ type: 'SET_WAIT_TIME', payload: response.data && response.data[0] });
  } catch (error) {
    yield put({ type: 'SET_RETRIEVE_ACTIVE_ORDER_ERROR' });
    console.log('User order get request failed', error);
  }
}

function* accountSaga() {
  yield takeLatest('SUBMIT_ORDER', submitCheckIn);
  yield takeLatest('FETCH_WAIT_TIME', fetchWaitTime);
}

export default accountSaga;
