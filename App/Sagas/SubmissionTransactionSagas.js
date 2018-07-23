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
import SubmissionTransactionActions from '../Redux/SubmissionTransactionRedux'
// import { SubmissionTransactionSelectors } from '../Redux/SubmissionTransactionRedux'

export function * getSubmissionTransactions (api, { id, page }) {
  const response = yield call(api.getSubmissionTransactions, id, page)

  if (response.ok) {
    yield put(SubmissionTransactionActions.getSubmissionTransactionsSuccess(response.data))
  } else {
    yield put(SubmissionTransactionActions.submissionTransactionFailure())
  }
}

export function * createTransaction (api, { form, files }) {
  const response = yield call(api.createTransaction, form, files)

  if (response.ok) {
    if (response.data.success) {
      yield put(SubmissionTransactionActions.createTransactionSuccess(response.data))
    } else {
      yield put(SubmissionTransactionActions.postSubmissionTransactionFailure())
    }
    alert(response.data.message)
  } else {
    yield put(SubmissionTransactionActions.postSubmissionTransactionFailure())
    alert('Pengajuan gagal ditambahkan')
  }
}

export function * deleteTransaction (api, { submissionId, transactionId }) {
  const response = yield call(api.deleteTransaction, submissionId, transactionId)

  if (response.ok) {
    if (response.data.success) {
      yield put(SubmissionTransactionActions.deleteTransactionSuccess(response.data))
    } else {
      yield put(SubmissionTransactionActions.submissionTransactionFailure())
    }
    alert(response.data.message)
  } else {
    yield put(SubmissionTransactionActions.submissionTransactionFailure())
    alert('Transaksi gagal dihapus')
  }
}
