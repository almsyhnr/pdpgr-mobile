import { put, select } from 'redux-saga/effects'
import StartupActions from '../Redux/StartupRedux'

export function * startup (api) {
  const token = yield select(state => state.auth.accessToken)
  console.tron.error(token)
  if (token !== null) {
    api.setHeader('Authorization', 'Bearer ' + token)
  }
  yield put(StartupActions.startupSuccess())
}
