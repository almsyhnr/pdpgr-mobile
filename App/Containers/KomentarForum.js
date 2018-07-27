import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, InteractionManager, FlatList, Text } from 'react-native'
import { connect } from 'react-redux'

import ForumReplyActions from '../Redux/ForumReplyRedux'
import { LoadingIndicator } from '../Components/Indicator'
import { EmptyForum } from '../Components/List'
import { ListItem, Divider, Button } from 'react-native-elements'
import { Avatar, TimeAgo } from '../Components/General'
import { Fonts, Colors } from '../Themes'
import { Input } from '../Components/Form'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

const styles = StyleSheet.create({
  timeAgo: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.emphasis,
    color: Colors.darkGray
  }
})

class KomentarForum extends Component {
  constructor (props) {
    super(props)
    this.state = {
      thread_id: props.forum.id,
      text: ''
    }
  }
  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.getForumReplies(1)
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.posting && !nextProps.posting && !nextProps.error) {
      this.getForumReplies(0)
    }
  }

  getForumReplies = page => {
    this.props.getForumReplies(this.props.forum.id, page)
  };

  loadMore = () => {
    const { pagination } = this.props
    if (pagination.current_page < pagination.total_pages) {
      this.getForumReplies(pagination.current_page + 1)
    }
  };

  renderButton = () => {
    return (
      <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
        <View style={{flex: 1, marginRight: 10}}>
          <Input value={this.state.text}
            onSubmitEditing={this.sendReply}
            onChangeText={text => this.setState({ text })} placeholder='Tulis komentar...' containerStyle={{marginBottom: 0}} />
        </View>

        <Button disabled={this.state.text.length === 0} onPress={this.sendReply} title='Kirim' buttonStyle={{backgroundColor: Colors.primary}} />
      </View>
    )
  }

  renderListItem = (item, index) => (
    <View style={{backgroundColor: Colors.snow}}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Avatar rounded source={{ uri: item.user.avatar }} />
        <Text style={{flex: 1, paddingHorizontal: 10}}>{item.user.name}</Text>
        <TimeAgo
          dateTime={item.created_at}
          textStyle={styles.timeAgo}
          showIcon={false}
                />
      </View>
      <View style={{padding: 10, paddingTop: 0}}>
        <Text style={{marginLeft: 45}}>{item.reply_text}</Text>
      </View>
      <Divider />
    </View>
  )

  renderItem = ({ item, index }) => {
    if (item.id === -1) {
      return this.renderButton()
    } else {
      return this.renderListItem(item, index)
    }
  }

  sendReply = () => {
    const { text } = this.state
    if (text.length > 0) {
      this.props.replyForum(this.state)
      this.setState({
        text: ''
      })
    }
  }

  render () {
    return (

      <View style={{flex: 1}} onStartShouldSetResponder={() => true}>
        <KeyboardAwareFlatList
          refreshing={false}
          onRefresh={() => this.getForumReplies(1)}
          data={[...this.props.replies, {id: -1}]}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            <LoadingIndicator visible={this.props.fetching} size={'large'} />
          }
        />

      </View>
    )
  }
}

KomentarForum.propTypes = {
  forum: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    replies: state.forumReply.data || [],
    fetching: state.forumReply.fetching,
    posting: state.forumReply.posting,
    error: state.forumReply.error,
    pagination: state.forumReply.pagination || {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getForumReplies: (id, page) =>
      dispatch(ForumReplyActions.getForumReplies(id, page)),
    replyForum: (form) => dispatch(ForumReplyActions.replyForum(form))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KomentarForum)
