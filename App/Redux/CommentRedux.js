import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import CommentTransformer from '../Transforms/CommentToChat'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getComments: ['id', 'page'],
  getCommentsSuccess: ['response'],
  postComment: ['id', 'form'],
  postCommentSuccess: ['response'],
  insertMessage: ['message'],
  postCommentFailure: null,
  commentFailure: null
})

export const CommentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  pagination: null,
  fetching: false,
  posting: false,
  error: null
})

/* ------------- Selectors ------------- */

export const CommentSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const getCommentsSuccess = (state, { response }) => {
  const { data, meta } = response
  const { pagination } = meta
  var newMessages = null
  if (pagination.current_page === 1) {
    newMessages = data
  } else {
    newMessages = state.data.concat(data)
  }

  // reformat message
  const messages = _.map(newMessages, message => {
    return CommentTransformer(message)
  })

  // remove duplicate message
  newMessages = _.uniqBy(messages, message => {
    return message._id
  })

  return state.merge({
    data: newMessages,
    fetching: false,
    error: null,
    pagination
  })
}

export const insertMessage = (state, { message }) => {
  var data = CommentTransformer(message)
  var messages = _.cloneDeep(state.data)
  messages.unshift(data)

  // remove duplicate message
  messages = _.uniqBy(messages, message => {
    return message._id
  })
  return state.merge({
    data: messages
  })
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
  [Types.GET_COMMENTS]: request,
  [Types.GET_COMMENTS_SUCCESS]: getCommentsSuccess,
  [Types.POST_COMMENT]: postRequest,
  [Types.INSERT_MESSAGE]: insertMessage,
  [Types.POST_COMMENT_SUCCESS]: postSuccess,
  [Types.POST_COMMENT_FAILURE]: postFailure,
  [Types.COMMENT_FAILURE]: failure
})
