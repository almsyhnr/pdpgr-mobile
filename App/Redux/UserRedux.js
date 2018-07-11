import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getUser: null,
  getUserSuccess: ['response'],
  userFailure: null,
  logout: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getUser: state => state.user
}

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({ fetching: true })

export const getUserSuccess = (state, { response }) => {
  return state.merge({ fetching: false, error: null, user: response })
}

export const failure = state =>
  state.merge({ fetching: false, error: true })

export const logout = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USER]: request,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.USER_FAILURE]: failure,
  [Types.LOGOUT]: logout
})
