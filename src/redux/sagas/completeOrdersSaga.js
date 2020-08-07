import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchCompleteOrders() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/order/complete/today', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_COMPLETE_ORDERS', payload: response.data });
    console.log("these are active orders:", response.data);
  } catch (error) {
    console.log('Order get request failed', error);
  }
}

function* activeOrdersSaga() {
  yield takeLatest('FETCH_COMPLETE_ORDERS', fetchCompleteOrders);
}

export default activeOrdersSaga;
