import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getSubmissionTermins: ['id'],
  getSubmissionTerminsSuccess: ['response'],
  resetSubmissionDetail: null,
  submissionTerminFailure: null
})

export const SubmissionTerminTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: null
})

/* ------------- Selectors ------------- */

export const SubmissionTerminSelectors = {
  getSubmissionTermins: state => state.data
}

/* ------------- Reducers ------------- */

export const getSubmissionTerminsSuccess = (state, { response }) => {
  const { data } = response
  return state.merge({ fetching: false, error: null, data })
}

export const request = (state) => state.merge({ fetching: true })
export const success = (state) => state.merge({ fetching: false, error: null })
export const failure = state => state.merge({ fetching: false, error: true })
export const reset = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SUBMISSION_TERMINS]: request,
  [Types.GET_SUBMISSION_TERMINS_SUCCESS]: getSubmissionTerminsSuccess,
  [Types.RESET_SUBMISSION_DETAIL]: reset,
  [Types.SUBMISSION_TERMIN_FAILURE]: failure
})
