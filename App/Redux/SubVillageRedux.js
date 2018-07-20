import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getSubVillages: null,
  getSubVillagesSuccess: ['response'],
  moduleFailure: null
})

export const SubVillageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const ModuleSelectors = {
  getSubVillages: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const getSubVillagesSuccess = (state, { response }) => {
  const { data } = response
  return state.merge({ fetching: false, error: null, data })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SUB_VILLAGES]: request,
  [Types.GET_SUB_VILLAGES_SUCCESS]: getSubVillagesSuccess,
  [Types.MODULE_FAILURE]: failure
})
