import { put, select } from 'redux-saga/effects'
import StartupActions from '../Redux/StartupRedux'
import MasterDataActions from '../Redux/MasterDataRedux'

export function * startup (api) {
  const token = yield select(state => state.auth.accessToken)
  console.tron.error(token)
  if (token !== null) {
    api.setHeader('Authorization', 'Bearer ' + token)
  }
  yield put(StartupActions.startupSuccess())
  yield put(MasterDataActions.getBantuanTani())
  yield put(MasterDataActions.getBantuanTernak())
  yield put(MasterDataActions.getDisabilitas())
  yield put(MasterDataActions.getJenisNelayan())
  yield put(MasterDataActions.getBantuanNelayan())
}
