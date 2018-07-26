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
import CommentActions from '../Redux/CommentRedux'

export function * getComments (api, {id, page}) {
  const response = yield call(api.getComments, id, page)

  if (response.ok) {
    yield put(CommentActions.getCommentsSuccess(response.data))
  } else {
    yield put(CommentActions.commentFailure())
  }
}

export function * postComment (api, {id, form}) {
  const response = yield call(api.postComment, id, form)

  if (response.ok) {
    yield put(CommentActions.postCommentSuccess(response.data))
  } else {
    yield put(CommentActions.commentFailure())
  }
}
