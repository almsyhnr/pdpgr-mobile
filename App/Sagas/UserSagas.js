/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'

export function * getUser (api) {
  const response = yield call(api.getUser)

  if (response.ok) {
    yield put(UserActions.getUserSuccess(response.data))
  } else {
    yield put(UserActions.userFailure())
  }
}

export function * changeAvatar (api, { file }) {
  const response = yield call(api.changeAvatar, file)

  if (response.ok) {
    if (response.data.success) {
      yield put(UserActions.postUserSuccess())
      yield put(UserActions.getUser())
    } else {
      yield put(UserActions.postUserFailure())
    }
    alert(response.data.message)
  } else {
    yield put(UserActions.postUserFailure())
    alert('Avatar gagal diubah')
  }
}
