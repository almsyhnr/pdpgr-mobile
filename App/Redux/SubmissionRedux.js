import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getSubmissions: ['page'],
  getSubmissionsSuccess: ['response'],
  createSubmission: ['form', 'files'],
  createSubmissionSuccess: ['response'],
  submissionFailure: null,
  postSubmissionFailure: null
})

export const SubmissionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  submissions: null,
  submissionsPagination: null,
  fetching: false,
  posting: false,
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
export const postRequest = (state) => state.merge({ posting: true })

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

export const success = state => state.merge({ fetching: false, error: null })
export const postSuccess = state => state.merge({ posting: false, error: false })
export const failure = state => state.merge({ fetching: false, error: true })
export const postFailure = state => state.merge({ posting: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SUBMISSIONS]: request,
  [Types.GET_SUBMISSIONS_SUCCESS]: getSubmissionsSuccess,
  [Types.CREATE_SUBMISSION]: postRequest,
  [Types.CREATE_SUBMISSION_SUCCESS]: postSuccess,
  [Types.SUBMISSION_FAILURE]: failure,
  [Types.POST_SUBMISSION_FAILURE]: postFailure
})
