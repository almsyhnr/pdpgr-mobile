import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getForums: ['id', 'page'],
  getForumsSuccess: ['response'],
  getForumDetail: ['id'],
  getForumDetailSuccess: ['response'],
  createForum: ['form'],
  updateForum: ['id', 'form'],
  resetForumDetail: null,
  resetForums: null,
  forumSuccess: null,
  postForumSuccess: null,
  postForumFailure: null,
  forumFailure: null
})

export const ForumTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  selected: null,
  fetching: false,
  posting: false,
  pagination: null,
  error: null
})

/* ------------- Selectors ------------- */

export const ForumSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const getForumsSuccess = (state, { response }) => {
  const { data, meta } = response
  var forums = null
  if (meta.pagination.current_page === 1) {
    forums = data
  } else {
    forums = state.data.concat(data)
  }
  return state.merge({ fetching: false, error: null, data: forums, pagination: meta.pagination })
}

export const getForumDetailSuccess = (state, { response }) => {
  const { data } = response
  return state.merge({ fetching: false, error: null, selected: data })
}

export const resetForumDetail = state => state.merge({ selected: null })

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
  [Types.GET_FORUMS]: request,
  [Types.GET_FORUMS_SUCCESS]: getForumsSuccess,
  [Types.GET_FORUM_DETAIL]: request,
  [Types.GET_FORUM_DETAIL_SUCCESS]: getForumDetailSuccess,
  [Types.CREATE_FORUM]: postRequest,
  [Types.UPDATE_FORUM]: postRequest,
  [Types.RESET_FORUM_DETAIL]: resetForumDetail,
  [Types.RESET_FORUMS]: reset,
  [Types.POST_FORUM_SUCCESS]: postSuccess,
  [Types.FORUM_SUCCESS]: success,
  [Types.FORUM_FAILURE]: failure,
  [Types.POST_FORUM_FAILURE]: postFailure
})
