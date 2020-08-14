import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCompleteOrders() {
  try {
    const response = yield axios.get('/api/location');
    yield put({ type: 'SET_PARKING_LOCATIONS', payload: response.data });
  } catch (error) {
    console.log('Location get request failed', error);
  }
}

function* activeOrdersSaga() {
  yield takeLatest('FETCH_ALL_LOCATIONS', fetchCompleteOrders);
}

export default activeOrdersSaga;
