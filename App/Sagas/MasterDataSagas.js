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
import MasterDataActions from '../Redux/MasterDataRedux'

export function * getBantuanTani (api) {
  const response = yield call(api.bantuanTani)

  // success?
  if (response.ok) {
    yield put(MasterDataActions.getBantuanTaniSuccess(response.data.data))
  } else {
    yield put(MasterDataActions.masterDataFailure())
  }
}

export function * getBantuanTernak (api) {
  const response = yield call(api.bantuanTernak)

  // success?
  if (response.ok) {
    yield put(MasterDataActions.getBantuanTernakSuccess(response.data.data))
  } else {
    yield put(MasterDataActions.masterDataFailure())
  }
}

export function * getDisabilitas (api) {
  const response = yield call(api.disabilitas)

  // success?
  if (response.ok) {
    yield put(MasterDataActions.getDisabilitasSuccess(response.data.data))
  } else {
    yield put(MasterDataActions.masterDataFailure())
  }
}

export function * getJenisNelayan (api) {
  const response = yield call(api.jenisNelayan)

  // success?
  if (response.ok) {
    yield put(MasterDataActions.getJenisNelayanSuccess(response.data.data))
  } else {
    yield put(MasterDataActions.masterDataFailure())
  }
}

export function * getBantuanNelayan (api) {
  const response = yield call(api.bantuanNelayan)

  // success?
  if (response.ok) {
    yield put(MasterDataActions.getBantuanNelayanSuccess(response.data.data))
  } else {
    yield put(MasterDataActions.masterDataFailure())
  }
}
