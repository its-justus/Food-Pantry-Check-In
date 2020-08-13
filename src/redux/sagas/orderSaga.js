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
    // CHeck to see if the wait_time_minutes for the order is null.
    // If it is return "processing...", otherwise return the actual value.
    let returnStr = '';
    if (response.data[0]) {
      if (response.data[0].wait_time_minutes) {
        returnStr = response.data[0].wait_time_minutes;
      } else {
        returnStr = 'Processing...';
      }
    } else {
      returnStr = 'Processing...';
    }

    // let returnStr = '';
    // let processing = true;
    // while (processing === true) {
    //   const response = yield axios.get('/api/order/client-order-status');
    //   yield delay(5000);
    //   console.log(response.data[0].est_wait_time);
    //   console.log(response.data[0]);
    //   if (response.data[0].est_wait_time !== null) {
    //     returnStr = response.data[0].est_wait_time;
    //     processing = false;
    //   }
    // }

    yield put({ type: 'SET_WAIT_TIME', payload: returnStr });
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
