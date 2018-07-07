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
import { Alert } from 'react-native'
import AuthActions from '../Redux/AuthRedux'
import UserActions from '../Redux/UserRedux'
import _ from 'lodash'

export function * signin (api, {email, password}) {
  const response = yield call(api.signin, email, password)

  if (response.ok) {
    const { role } = response.data
    if (!_.includes(['agen_peliuk', 'agen_kecamatan'], role)) {
      Alert.alert('Error', 'Silahkan melakukan login melalui browser')
      yield put(AuthActions.authFailure(response))
      return
    }
    yield put(AuthActions.signinSuccess(response.data))
    yield put(UserActions.getUserSuccess(response.data))
    api.setHeader('Authorization', 'Bearer ' + response.data.access_token)
  } else {
    Alert.alert('Error', 'Email atau password salah')
    yield put(AuthActions.authFailure(response))
  }
}
