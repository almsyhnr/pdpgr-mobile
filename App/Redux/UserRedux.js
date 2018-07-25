import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getUser: null,
  getUserSuccess: ['response'],
  changeAvatar: ['file'],
  changePassword: ['form'],
  updateProfile: ['form'],
  postUserSuccess: null,
  userFailure: null,
  postUserFailure: null,
  logout: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getUser: state => state.data
}

/* ------------- Reducers ------------- */

export const getUserSuccess = (state, { response }) => {
  return state.merge({ fetching: false, error: null, data: response })
}

// standard
export const request = (state) => state.merge({ fetching: true })
export const postRequest = (state) => state.merge({ posting: true })
export const success = state => state.merge({ fetching: false, error: null })
export const postSuccess = state => state.merge({ posting: false, error: false })
export const failure = state => state.merge({ fetching: false, error: true })
export const postFailure = state => state.merge({ posting: false, error: true })
export const reset = state => INITIAL_STATE

export const logout = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USER]: request,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.CHANGE_AVATAR]: postRequest,
  [Types.CHANGE_PASSWORD]: postRequest,
  [Types.UPDATE_PROFILE]: postRequest,
  [Types.POST_USER_SUCCESS]: postSuccess,
  [Types.POST_USER_FAILURE]: postFailure,
  [Types.USER_FAILURE]: failure,
  [Types.LOGOUT]: logout
})
