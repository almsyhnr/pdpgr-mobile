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
import StbmActions from '../Redux/StbmRedux'

export function * getListStbm (api, { page }) {
  const response = yield call(api.getListStbm, page)

  if (response.ok) {
    yield put(StbmActions.getListStbmSuccess(response.data))
  } else {
    yield put(StbmActions.stbmFailure())
  }
}

export function * getDetailStbm (api, { id }) {
  const response = yield call(api.getDetailStbm, id)

  if (response.ok) {
    yield put(StbmActions.getDetailStbmSuccesss(response.data))
  } else {
    yield put(StbmActions.stbmFailure())
  }
}
