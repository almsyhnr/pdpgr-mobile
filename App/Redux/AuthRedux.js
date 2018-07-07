import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signin: ['email', 'password'],
  signinSuccess: ['response'],
  logout: null,
  authFailure: ['response']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  accessToken: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getAccessToken: state => state.accessToken
}

/* ------------- Reducers ------------- */

export const request = (state, { data }) =>
  state.merge({ fetching: true })

export const signinSuccess = (state, { response }) => {
  return state.merge({ fetching: false, error: null, accessToken: response.access_token })
}

export const failure = state =>
  state.merge({ fetching: false, error: true })

export const logout = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNIN]: request,
  [Types.SIGNIN_SUCCESS]: signinSuccess,
  [Types.LOGOUT]: logout,
  [Types.AUTH_FAILURE]: failure
})
