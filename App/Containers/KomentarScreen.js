import React, { Component } from 'react'
import { InteractionManager, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat'
import CommentTransformer from '../Transforms/ChatToComment'
import _ from 'lodash'
import moment from 'moment'

// redux
import CommentActions from '../Redux/CommentRedux'

// Styles
import styles from './Styles/KomentarScreenStyle'

class KomentarScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Komentar'
    }
  };

  state = {
    messages: []
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.getComments(1)
    })
  }

  componentWillUnmount () {
    this.props.commentReset()
  }

  getComments = (page) => {
    const id = this.props.navigation.state.params.id
    this.props.getComments(id, page)
  }

  onSend (messages) {
    const { user } = this.props
    const id = this.props.navigation.state.params.id
    let message = CommentTransformer(messages[0])
    this.props.postComment(id, message)

    const chat = {
      id: `delete` + moment().toISOString(),
      comment: message.comment,
      user: {
        ...user
      }
    }
    this.props.insertMessage(chat)
  }

  loadMore = () => {
    this.getComments(this.props.pagination.current_page + 1)
  }

  render () {
    const { user, comments, pagination } = this.props
    return (
      <GiftedChat
        messages={comments}
        onSend={messages => this.onSend(messages)}
        renderAvatarOnTop
        loadEarlier={pagination.current_page < pagination.total_pages}
        onLoadEarlier={this.loadMore}
        user={{
          _id: user.id,
          name: user.name,
          avatar: user.avatar
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    comments: state.comment.data,
    fetching: state.comment.fetching,
    posting: state.comment.posting,
    error: state.comment.error,
    pagination: state.comment.pagination || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (id, page) => dispatch(CommentActions.getComments(id, page)),
    postComment: (id, form) => dispatch(CommentActions.postComment(id, form)),
    insertMessage: (message) => dispatch(CommentActions.insertMessage(message)),
    commentReset: () => dispatch(CommentActions.commentReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KomentarScreen)
