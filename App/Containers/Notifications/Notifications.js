import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, InteractionManager, BackHandler, StatusBar, FlatList } from 'react-native'
import { NavigationActions } from 'react-navigation'

// redux
import NotificationActions from '../../Redux/NotificationRedux'

// component
import { NotificationItem, EmptyNotification } from '../../Components/List'
import { LoadingIndicator } from '../../Components/Indicator'

// styles
import styles from './styles'
import { Colors } from '../../Themes'

class Notifications extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Notifikasi'
    }
  }

  componentWillMount () {
    InteractionManager.runAfterInteractions(() => {
      this.getNotifications(1)
    })
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this._backHandler)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._backHandler)
  }

  loadMore = () => {
    const { pagination } = this.props
    if (pagination.current_page < pagination.total_pages) {
      this.getNotifications(pagination.current_page + 1)
    }
  }

  _backHandler () {
    const { nav, navigation } = this.props
    if (nav.index === 0) {
      return false
    }
    navigation.dispatch(NavigationActions.back())
    return true
  }

  getNotifications = (page) => {
    this.props.getNotifications(page)
  }

  handleNotificationClick = (data) => {
    if (!data.read) {
      this.props.readNotification(data.id)
    }
    if (data.type === 'pengajuan') {
      this.props.navigation.navigate('DetailPengajuan', {
        id: data.notifiable_id
      })
    } else {
      this.props.navigation.navigate('DetailRealisasi', {
        id: data.notifiable_id
      })
    }
  }

  renderItem = ({ item, index }) => <NotificationItem data={item} onPress={() => this.handleNotificationClick(item)} />

  render () {
    return (
      <View style={styles.container}>
        <StatusBar />
        <FlatList
          refreshing={false}
          onRefresh={() => this.getNotifications(1)}
          data={this.props.notifications}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderItem}
          contentContainerStyle={{flexGrow: 1}}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={<LoadingIndicator visible={this.props.fetching} size={'large'} />}
          ListEmptyComponent={<EmptyNotification />}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav,
    notifications: state.notification.data,
    fetching: state.notification.fetching,
    error: state.notification.error,
    pagination: state.notification.pagination || {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: page => dispatch(NotificationActions.getNotifications(page)),
    readNotification: id => dispatch(NotificationActions.readNotification(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
