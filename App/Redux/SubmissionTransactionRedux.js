import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getSubmissionTransactions: ['id', 'page'],
  getSubmissionTransactionsSuccess: ['response'],
  resetSubmissionDetail: null,
  postSubmissionTransactionFailure: null,
  submissionTransactionFailure: null
})

export const SubmissionTransactionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  posting: false,
  pagination: null,
  error: null
})

/* ------------- Selectors ------------- */

export const SubmissionTransactionSelectors = {
  getSubmissionTransactions: state => state.data
}

/* ------------- Reducers ------------- */

// successful api lookup
export const getSubmissionTransactionsSuccess = (state, { response }) => {
  const { data, meta } = response
  var transactions = null
  if (meta.pagination.current_page === 1) {
    transactions = data
  } else {
    transactions = state.data.concat(data)
  }
  return state.merge({ fetching: false, error: null, data: transactions, pagination: meta.pagination })
}

// standard
export const request = (state) => state.merge({ fetching: true })
export const postRequest = (state) => state.merge({ posting: true })
export const success = state => state.merge({ fetching: false, error: null })
export const postSuccess = state => state.merge({ posting: false, error: false })
export const failure = state => state.merge({ fetching: false, error: true })
export const postFailure = state => state.merge({ posting: false, error: true })
export const reset = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SUBMISSION_TRANSACTIONS]: request,
  [Types.GET_SUBMISSION_TRANSACTIONS_SUCCESS]: getSubmissionTransactionsSuccess,
  [Types.SUBMISSION_TRANSACTION_FAILURE]: failure,
  [Types.POST_SUBMISSION_TRANSACTION_FAILURE]: postFailure,
  [Types.RESET_SUBMISSION_DETAIL]: reset
})
