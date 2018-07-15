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
import SubmissionActions from '../Redux/SubmissionRedux'
// import { SubmissionSelectors } from '../Redux/SubmissionRedux'

export function * getSubmissions (api, { page }) {
  const response = yield call(api.getSubmissions, page)

  if (response.ok) {
    yield put(SubmissionActions.getSubmissionsSuccess(response.data))
  } else {
    yield put(SubmissionActions.submissionFailure())
  }
}

export function * getMySubmissions (api, { page }) {
  const response = yield call(api.getMySubmissions, page)

  if (response.ok) {
    yield put(SubmissionActions.getSubmissionsSuccess(response.data))
  } else {
    yield put(SubmissionActions.submissionFailure())
  }
}

export function * createSubmission (api, { form, files }) {
  const response = yield call(api.createSubmission, form, files)

  if (response.ok) {
    if (response.data.success) {
      yield put(SubmissionActions.createSubmissionSuccess(response.data))
    } else {
      yield put(SubmissionActions.postSubmissionFailure())
    }
    alert(response.data.message)
  } else {
    yield put(SubmissionActions.postSubmissionFailure())
    alert('Pengajuan gagal ditambahkan')
  }
}
