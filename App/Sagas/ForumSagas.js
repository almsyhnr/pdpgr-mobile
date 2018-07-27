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
import ForumActions from '../Redux/ForumRedux'
// import { ForumSelectors } from '../Redux/ForumRedux'

export function * getForums (api, {id, page}) {
  const response = yield call(api.getForums, id, page)

  if (response.ok) {
    yield put(ForumActions.getForumsSuccess(response.data))
  } else {
    yield put(ForumActions.forumFailure())
  }
}

export function * getForumDetail (api, {id}) {
  const response = yield call(api.getForumDetail, id)

  if (response.ok) {
    yield put(ForumActions.getForumDetailSuccess(response.data))
  } else {
    yield put(ForumActions.forumFailure())
  }
}

export function * createForum (api, {form}) {
  const response = yield call(api.createForum, form)

  if (response.ok) {
    yield put(ForumActions.postForumSuccess(response.data))
  } else {
    yield put(ForumActions.postForumFailure())
  }
}

export function * updateForum (api, {id, form}) {
  const response = yield call(api.updateForum, id, form)

  if (response.ok) {
    yield put(ForumActions.postForumSuccess(response.data))
  } else {
    yield put(ForumActions.postForumFailure())
  }
}
