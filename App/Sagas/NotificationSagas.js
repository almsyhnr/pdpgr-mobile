/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import NotificationActions from '../Redux/NotificationRedux'
// import { NotificationSelectors } from '../Redux/NotificationRedux'

export function * getNotifications (api, { page }) {
  const response = yield call(api.getNotifications, page)

  if (response.ok) {
    yield put(NotificationActions.getNotificationsSuccess(response.data))
  } else {
    yield put(NotificationActions.notificationFailure())
  }
}

export function * readNotification (api, { id }) {
  const response = yield call(api.readNotification, id)

  if (response.ok) {
    yield put(NotificationActions.readNotificationSuccess(response.data))
    yield put(NotificationActions.getNotifications(1))
  } else {
    yield put(NotificationActions.notificationFailure())
  }
}
