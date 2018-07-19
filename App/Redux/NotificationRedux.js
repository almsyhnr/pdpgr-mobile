import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getNotifications: ['page'],
  getNotificationsSuccess: ['response'],
  readNotification: ['id'],
  readNotificationSuccess: ['response'],
  notificationFailure: null
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  pagination: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const NotificationSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const getNotificationsSuccess = (state, {response}) => {
  const { data, meta } = response
  var notifications = null
  if (meta.pagination.current_page === 1) {
    notifications = data
  } else {
    notifications = state.data.concat(data)
  }
  return state.merge({ fetching: false, error: null, data: notifications, pagination: meta.pagination })
}

export const request = (state) => state.merge({ fetching: true })
export const success = (state) => state.merge({ fetching: false, error: null })
export const failure = state => state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NOTIFICATIONS]: request,
  [Types.GET_NOTIFICATIONS_SUCCESS]: getNotificationsSuccess,
  [Types.READ_NOTIFICATION]: request,
  [Types.READ_NOTIFICATION_SUCCESS]: success,
  [Types.NOTIFICATION_FAILURE]: failure
})
