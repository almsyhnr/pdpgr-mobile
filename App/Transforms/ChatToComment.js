import Moment from 'moment'

export default (chat) => {
  const data = {
    ...chat,
    createdDate: Moment(chat.createdDate),
    comment: chat.text
  }
  return data
}
