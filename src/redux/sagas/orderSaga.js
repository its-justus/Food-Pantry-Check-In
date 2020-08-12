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

function* accountSaga() {
  yield takeLatest('SUBMIT_ORDER', submitCheckIn);
}

export default accountSaga;
