import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getForumReplies: ['id', 'page'],
  getForumRepliesSuccess: ['response'],
  replyForum: ['form'],
  forumReplySuccess: null,
  forumReplyFailure: null,
  postForumReplySuccess: null,
  postForumReplyFailure: null
})

export const ForumReplyTypes = Types
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

export const ForumReplySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const getForumRepliesSuccess = (state, { response }) => {
  const { data, meta } = response
  var replies = null
  if (meta.pagination.current_page === 1) {
    replies = data
  } else {
    replies = state.data.concat(data)
  }
  return state.merge({ fetching: false, error: null, data: replies, pagination: meta.pagination })
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
  [Types.GET_FORUM_REPLIES]: request,
  [Types.GET_FORUM_REPLIES_SUCCESS]: getForumRepliesSuccess,
  [Types.REPLY_FORUM]: postRequest,
  [Types.POST_FORUM_REPLY_SUCCESS]: postSuccess,
  [Types.POST_FORUM_REPLY_FAILURE]: postFailure,
  [Types.FORUM_REPLY_SUCCESS]: success,
  [Types.FORUM_REPLY_FAILURE]: failure
})
