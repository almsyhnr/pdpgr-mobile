import moment from 'moment'

export default (comment) => {
  const data = {
    ...comment,
    _id: comment.id,
    createdAt: moment(comment.createdDate).toDate(),
    text: comment.comment,
    user: {
      ...comment.user,
      _id: comment.user.id
    }
  }
  return data
}
