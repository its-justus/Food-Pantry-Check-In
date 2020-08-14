import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// This will get info about the current user and the parking locations.
function* fetchInfo() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };

    yield put({ type: 'SET_SERVER_LOADING' });

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/account', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });

    const locationsResponse = yield axios.get('/api/location');
    yield put({ type: 'SET_PARKING_LOCATIONS', payload: locationsResponse.data });
    yield put({ type: 'CLEAR_SERVER_LOADING' });
  } catch (error) {
    yield put({ type: 'FAILED_REQUEST' });
    console.log('User get request failed', error);
  }
}

// function* getHouseholdMembers(action) {
//   try {
//     const householdMembers = yield axios.get(`/api/account/household-members/${action.payload}`);
//     console.log('response', householdMembers);
//     if (householdMembers.data[0]) {

//     }
//   } catch (error) {
//     console.log(`GET members for household with id ${action.payload} failed`, error);
//   }
// }

function* accountSaga() {
  yield takeLatest('FETCH_INFO', fetchInfo);
  // yield takeLatest('GET_HOUSEHOLD_MEMBERS', getHouseholdMembers);
}

export default accountSaga;
