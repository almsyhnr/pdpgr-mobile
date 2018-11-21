import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getBantuanTani: null,
  getBantuanTaniSuccess: ['response'],
  getBantuanTernak: null,
  getBantuanTernakSuccess: ['response'],
  getDisabilitas: null,
  getDisabilitasSuccess: ['response'],
  getJenisNelayan: null,
  getJenisNelayanSuccess: ['response'],
  getBantuanNelayan: null,
  getBantuanNelayanSuccess: ['response'],
  masterDataFailure: null
})

export const MasterDataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  bantuanTani: [],
  bantuanTernak: [],
  disabilitas: [],
  jenisNelayan: [],
  bantuanNelayan: []
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

export const getBantuanTaniSuccess = (state, { response }) => state.merge({ bantuanTani: response })
export const getBantuanTernakSuccess = (state, { response }) => state.merge({ bantuanTernak: response })
export const getDisabilitasSuccess = (state, { response }) => state.merge({ disabilitas: response })
export const getJenisNelayanSuccess = (state, { response }) => state.merge({ jenisNelayan: response })
export const getBantuanNelayanSuccess = (state, { response }) => state.merge({ bantuanNelayan: response })

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BANTUAN_TANI]: request,
  [Types.GET_BANTUAN_TANI_SUCCESS]: getBantuanTaniSuccess,
  [Types.GET_BANTUAN_TERNAK]: request,
  [Types.GET_BANTUAN_TERNAK_SUCCESS]: getBantuanTernakSuccess,
  [Types.GET_DISABILITAS]: request,
  [Types.GET_DISABILITAS_SUCCESS]: getDisabilitasSuccess,
  [Types.GET_JENIS_NELAYAN]: request,
  [Types.GET_JENIS_NELAYAN_SUCCESS]: getJenisNelayanSuccess,
  [Types.GET_BANTUAN_NELAYAN]: request,
  [Types.GET_BANTUAN_NELAYAN_SUCCESS]: getBantuanNelayanSuccess,
  [Types.MASTER_DATA_FAILURE]: failure
})
