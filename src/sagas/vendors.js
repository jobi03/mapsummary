import { put } from 'redux-saga/effects'
import axios from 'axios'

// todo: use this later
// fetch the user's list
export function * vendorsLoad (action) {
  // call the api to get the users list
  axios
    .get('/vendors')
    .then(function (response) {
      console.log(response.data)
      // save the users in state
      put({
        type: 'VENDORS_SAVE',
        vendors: response.data
      })
    })
    .catch(function (error) {
      console.log(error)
    })
}
