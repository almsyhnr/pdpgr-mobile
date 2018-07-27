import React, { Component } from 'react'
import { FlatList, Image, View, Text, InteractionManager } from 'react-native'
import { connect } from 'react-redux'

import ForumActions from '../../Redux/ForumRedux'

// components
import { StatusBar, UnderDevelopment } from '../../Components/General'

// styles
import { Images } from '../../Themes'
import styles from './styles'
import { FORUM_TYPE } from './constant'
import { LoadingIndicator } from '../../Components/Indicator'
import { EmptyForum, ForumItem } from '../../Components/List'
import { AddForumButton } from '../../Components/Button'

class ForumSatpolPp extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Forum Satpol PP',
      title: 'Forum Satpol PP',
      drawerIcon: ({focused}) => <Image source={Images.ic_forum} style={styles.sidebarIcon} />
    }
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.getForums(1)
    })
  }

  getForums = (page) => {
    this.props.getForums(FORUM_TYPE['Pol PP'], page)
  }

  loadMore = () => {
    const { pagination } = this.props
    if (pagination.current_page < pagination.total_pages) {
      this.getForums(pagination.current_page + 1)
    }
  };

  renderItem = ({ item, index }) => (
    <ForumItem
      forum={item}

    />
  );

  render () {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.forumTitleContainer}>
          <Text style={styles.forumTitle}>Forum Diskusi Satpol PP</Text>
        </View>
        <FlatList
          refreshing={false}
          onRefresh={() => this.getForums(1)}
          data={this.props.forums}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderItem}
          contentContainerStyle={{ flexGrow: 1 }}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            <LoadingIndicator visible={this.props.fetching} size={'large'} />
          }
          ListEmptyComponent={<EmptyForum />}
        />
        <AddForumButton />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    forums: state.forum.data,
    pagination: state.forum.pagination || {},
    fetching: state.forum.fetching,
    error: state.forum.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getForums: (type, page) => dispatch(ForumActions.getForums(type, page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumSatpolPp)
