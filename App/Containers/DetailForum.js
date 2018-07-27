import React, { Component } from 'react'
import { ScrollView, InteractionManager, View, Text } from 'react-native'
import { connect } from 'react-redux'

import ForumActions from '../Redux/ForumRedux'

// Styles
import styles from './Styles/DetailForumStyle'
import { StatusBar, Avatar } from '../Components/General'
import { ListItem } from 'react-native-elements'
import moment from 'moment'
import HTML from 'react-native-render-html'
import { Metrics, Fonts } from '../Themes'
import KomentarForum from './KomentarForum'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class DetailForum extends Component {
  static navigationOptions = {
    title: 'Detail Forum'
  };

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.getForumDetail()
    })
  }

  componentWillUnmount () {
    this.props.resetForumDetail()
  }

  getForumDetail = () => {
    this.props.getForumDetail(this.props.navigation.state.params.id)
  };

  render () {
    const { forum } = this.props
    if (!forum) {
      return null
    }
    const avatar = <Avatar small rounded source={{ uri: forum.user.avatar }} />
    const rightElement = (
      <View>
        <Text>Views: {forum.views}</Text>
        <Text>Replies: {forum.reply_count}</Text>
      </View>
    )
    const subtitle = 'Diposting pada: ' + moment(forum.created_at).format('D-M-Y')
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.forumTitleContainer}>
          <Text style={styles.forumTitle}>
            Forum Diskusi {this.props.navigation.state.params.type.title}
          </Text>
        </View>
        <ScrollView stickyHeaderIndices={[3]}>
          <ListItem
            title={forum.user.name}
            leftElement={avatar}
            rightElement={rightElement}
            subtitle={subtitle}
            subtitleStyle={styles.diposting}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{forum.title}</Text>
          </View>
          <View style={styles.body}>
            <HTML html={forum.body}
              baseFontStyle={{fontFamily: Fonts.type.base}}
              imagesMaxWidth={Metrics.screenWidth} />
          </View>
          <View style={styles.forumTitleContainer}>
            <Text style={styles.forumTitle}>
              Reply
            </Text>
          </View>
          <View style={styles.replyContainer}>
            <KomentarForum forum={forum} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    forum: state.forum.selected,
    fetching: state.forum.fetching,
    error: state.forum.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getForumDetail: id => dispatch(ForumActions.getForumDetail(id)),
    resetForumDetail: () => dispatch(ForumActions.resetForumDetail())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailForum)
