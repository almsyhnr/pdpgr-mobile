import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getSubmissions: ['page'],
  getSubmissionsSuccess: ['response'],
  submissionFailure: null
})

export const SubmissionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  submissions: null,
  submissionsPagination: null,
  fetching: false,
  error: null
})

/* ------------- Selectors ------------- */

export const SubmissionSelectors = {
  getSubmissions: state => state.submissions
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const getSubmissionsSuccess = (state, { response }) => {
  const { data, meta } = response
  var submissions = null
  if (meta.pagination.current_page === 1) {
    submissions = data
  } else {
    submissions = state.submissions.concat(data)
  }
  return state.merge({ fetching: false, error: null, submissions: submissions, submissionsPagination: meta.pagination })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SUBMISSIONS]: request,
  [Types.GET_SUBMISSIONS_SUCCESS]: getSubmissionsSuccess,
  [Types.SUBMISSION_FAILURE]: failure
})
