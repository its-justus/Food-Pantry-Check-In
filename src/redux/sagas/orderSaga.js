import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* submitCheckIn(action) {
  console.log('action.payload', action.payload);
  try {
    yield axios.post('/api/order', action.payload);
  } catch (error) {
    yield put({ type: 'SET_ORDER_PLACEMENT_ERROR' });
    console.log('User get request failed', error);
  }
}

function* getHouseholdId(action) {
  console.log('action.payload', action.payload);
  try {
    yield axios.post(`/api/order/household-id/${action.payload}`);
  } catch (error) {
    console.log('Household id get request failed', error);
  }
}

function* accountSaga() {
  yield takeLatest('SUBMIT_ORDER', submitCheckIn);
  yield takeLatest('GET_HOUSEHOLD_ORDER_INFO', getHouseholdId);
}

export default accountSaga;
