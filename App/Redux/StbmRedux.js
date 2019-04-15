import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getListStbm: ['page'],
  getListStbmSuccess: ['response'],
  getDetailStbm: ['id'],
  getDetailStbmSuccess: ['response'],
  stbmPostFailure: null,
  stbmFailure: null
})

export const StbmTypes = Types
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

export const StbmSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const getListStbmSuccess = (state, { response }) => {
  const { data, meta } = response
  var stbm = null
  if (meta.pagination.current_page === 1) {
    stbm = data
  } else {
    stbm = state.data.concat(data)
  }
  return state.merge({ fetching: false, error: null, data: stbm, pagination: meta.pagination })
}

export const getDetailStbmSuccess = (state, { response }) => {
  const { data } = response
  return state.merge({ fetching: false, error: null, selected: data })
}

// standard
export const request = (state) => state.merge({ fetching: true })
export const postRequest = (state) => state.merge({ posting: true })
export const success = state => state.merge({ fetching: false, error: null })
export const postSuccess = state => state.merge({ posting: false, error: false })
export const failure = state => state.merge({ fetching: false, error: true })
export const postFailure = state => state.merge({ posting: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_STBM]: request,
  [Types.GET_LIST_STBM_SUCCESS]: getListStbmSuccess,
  [Types.GET_DETAIL_STBM]: request,
  [Types.GET_DETAIL_STBM_SUCCESS]: getDetailStbmSuccess,
  [Types.STBM_POST_FAILURE]: postFailure,
  [Types.STBM_FAILURE]: failure
})
