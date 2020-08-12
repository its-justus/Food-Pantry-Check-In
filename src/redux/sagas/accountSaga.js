import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/account', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
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
  yield takeLatest('FETCH_USER', fetchUser);
  // yield takeLatest('GET_HOUSEHOLD_MEMBERS', getHouseholdMembers);
}

export default accountSaga;
