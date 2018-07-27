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

const styles = StyleSheet.create({
  timeAgo: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.emphasis,
    color: Colors.darkGray
  }
})

class KomentarForum extends Component {
  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.getForumReplies(1)
    })
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

  renderItem = ({ item, index }) => (
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

  );

  render () {
    return (
      <View style={{flex: 1}} onStartShouldSetResponder={() => true}>
        <FlatList
          refreshing={false}
          onRefresh={() => this.getForumReplies(1)}
          data={this.props.replies}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            <LoadingIndicator visible={this.props.fetching} size={'large'} />
          }
        />
        <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
          <View style={{flex: 1, marginRight: 10}}>
            <Input placeholder='Tulis komentar...' containerStyle={{marginBottom: 0}} />
          </View>

          <Button title='Kirim' buttonStyle={{backgroundColor: Colors.primary}} />
        </View>
      </View>
    )
  }
}

KomentarForum.propTypes = {
  forum: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    replies: state.forumReply.data,
    fetching: state.forumReply.fetching,
    error: state.forumReply.error,
    pagination: state.forumReply.pagination || {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getForumReplies: (id, page) =>
      dispatch(ForumReplyActions.getForumReplies(id, page))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KomentarForum)
