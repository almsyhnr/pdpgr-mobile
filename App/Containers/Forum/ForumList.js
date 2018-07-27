import React, { Component } from 'react'
import { FlatList, Image, View, Text, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ForumActions from '../../Redux/ForumRedux'

// components
import { StatusBar, UnderDevelopment } from '../../Components/General'

// styles
import { Images } from '../../Themes'
import styles from './styles'
import { LoadingIndicator } from '../../Components/Indicator'
import { EmptyForum, ForumItem } from '../../Components/List'
import { AddForumButton } from '../../Components/Button'

class ForumList extends Component {
  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.getForums(1)
    })
  }

  getForums = (page) => {
    this.props.getForums(this.props.type.id, page)
  }

  loadMore = () => {
    const { pagination } = this.props
    if (pagination.current_page < pagination.total_pages) {
      this.getForums(pagination.current_page + 1)
    }
  };

  openDetailForum = item => {
    this.props.navigation.navigate('DetailForum', {
      id: item.id,
      type: this.props.type
    })
  };

  renderItem = ({ item, index }) => (
    <ForumItem
      forum={item}
      onPress={() => this.openDetailForum(item)}
    />
  );

  render () {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.forumTitleContainer}>
          <Text style={styles.forumTitle}>Forum Diskusi {this.props.type.title}</Text>
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

ForumList.props = {
  type: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(ForumList)
