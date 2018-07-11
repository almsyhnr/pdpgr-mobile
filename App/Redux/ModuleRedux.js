import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getModules: null,
  getModulesSuccess: ['response'],
  moduleFailure: null
})

export const ModuleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modules: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const ModuleSelectors = {
  getModules: state => state.modules
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const getModulesSuccess = (state, { response }) => {
  const { data } = response
  return state.merge({ fetching: false, error: null, modules: data })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MODULES]: request,
  [Types.GET_MODULES_SUCCESS]: getModulesSuccess,
  [Types.MODULE_FAILURE]: failure
})
