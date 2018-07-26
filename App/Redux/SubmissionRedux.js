import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getMySubmissions: ['page'],
  getMyApprovedSubmissions: ['page'],
  getSubmissions: ['page'],
  getSubmissionsSuccess: ['response'],
  createSubmission: ['form', 'files'],
  createSubmissionSuccess: ['response'],
  getSubmissionDetail: ['id'],
  getSubmissionDetailSuccess: ['response'],
  likeSubmission: ['id'],
  likeSubmissionSuccess: ['response'],
  incrementSubmissionComment: ['id'],
  resetSubmissionDetail: null,
  resetSubmissions: null,
  submissionFailure: null,
  postSubmissionFailure: null,
  postSubmissionSuccess: null
})

export const SubmissionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  pagination: null,
  selected: null,
  fetching: false,
  posting: false,
  error: null
})

/* ------------- Selectors ------------- */

export const SubmissionSelectors = {
  getSubmissions: state => state.data
}

/* ------------- Reducers ------------- */

// successful api lookup
export const getSubmissionsSuccess = (state, { response }) => {
  const { data, meta } = response
  var submissions = null
  if (meta.pagination.current_page === 1) {
    submissions = data
  } else {
    submissions = state.data.concat(data)
  }
  return state.merge({ fetching: false, error: null, data: submissions, pagination: meta.pagination })
}

export const getSubmissionDetailSuccess = (state, { response }) => {
  const { data } = response
  return state.merge({ fetching: false, error: null, selected: data })
}

export const likeSubmissionSuccess = (state, { response }) => {
  const { submission_id, like_count, liked } = response
  let submissions = [...state.data]
  submissions = _.map(submissions, item => {
    if (item.id == submission_id) {
      return {
        ...item,
        like_count: like_count,
        liked: liked
      }
    }

    return item
  })
  return state.merge({ posting: false, error: null, data: submissions })
}

export const incrementSubmissionComment = (state, { id }) => {
  let data = _.map(_.cloneDeep(state.data), item => {
    if (item.id === id) {
      item.comment_count = item.comment_count + 1
      console.tron.display({
        name: 'increment',
        value: {
          id,
          item,
          equal: item.id === id
        }
      })
    }

    return item
  })
  return state.merge({ data })
}
export const resetSubmissionDetail = state => state.merge({ selected: null })
export const resetSubmissions = state => state.merge({ data: null, pagination: null })

// standard
export const request = (state) => state.merge({ fetching: true })
export const postRequest = (state) => state.merge({ posting: true })
export const success = state => state.merge({ fetching: false, error: null })
export const postSuccess = state => state.merge({ posting: false, error: false })
export const failure = state => state.merge({ fetching: false, error: true })
export const postFailure = state => state.merge({ posting: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SUBMISSIONS]: request,
  [Types.GET_MY_SUBMISSIONS]: request,
  [Types.GET_MY_APPROVED_SUBMISSIONS]: request,
  [Types.GET_SUBMISSIONS_SUCCESS]: getSubmissionsSuccess,
  [Types.CREATE_SUBMISSION]: postRequest,
  [Types.CREATE_SUBMISSION_SUCCESS]: postSuccess,
  [Types.GET_SUBMISSION_DETAIL]: request,
  [Types.GET_SUBMISSION_DETAIL_SUCCESS]: getSubmissionDetailSuccess,
  [Types.LIKE_SUBMISSION]: postRequest,
  [Types.LIKE_SUBMISSION_SUCCESS]: likeSubmissionSuccess,
  [Types.INCREMENT_SUBMISSION_COMMENT]: incrementSubmissionComment,
  [Types.RESET_SUBMISSION_DETAIL]: resetSubmissionDetail,
  [Types.RESET_SUBMISSIONS]: resetSubmissions,
  [Types.POST_SUBMISSION_SUCCESS]: postSuccess,
  [Types.SUBMISSION_FAILURE]: failure,
  [Types.POST_SUBMISSION_FAILURE]: postFailure
})
