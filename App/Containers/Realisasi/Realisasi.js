import React, { Component } from 'react'
import {
  View,
  Image,
  FlatList,
  BackHandler,
  InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

// redux
import SubmissionActions from '../../Redux/SubmissionRedux'

// components
import { StatusBar } from '../../Components/General'
import { NotificationButton } from '../../Components/Button'
import { ReportItem, EmptyReport } from '../../Components/List'
import { LoadingIndicator } from '../../Components/Indicator'

// styles
import styles from './styles'
import { Images } from '../../Themes'

class Realisasi extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Realisasi',
      title: 'Realisasi',
      drawerIcon: ({ focused }) => (
        <Image source={Images.ic_realisasi} style={styles.sidebarIcon} />
      ),
      headerRight: (
        <NotificationButton
          onPress={() => navigation.navigate('Notifications')}
        />
      )
    }
  };

  constructor (props) {
    super(props)
    this._backHandler = this._backHandler.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  componentWillMount () {
    InteractionManager.runAfterInteractions(() => {
      this.getMyApprovedSubmissions(1)
    })
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this._backHandler)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._backHandler)
    this.props.resetSubmissions()
  }

  getMyApprovedSubmissions = page => {
    this.props.getMyApprovedSubmissions(page)
  };

  loadMore = () => {
    const { pagination } = this.props
    if (pagination.current_page < pagination.total_pages) {
      this.getMyApprovedSubmissions(pagination.current_page + 1)
    }
  };

  _backHandler () {
    const { nav, navigation } = this.props
    if (nav.index === 0) {
      return false
    }
    navigation.dispatch(NavigationActions.back())
    return true
  }

  likePengajuan = (id) => {
    this.props.likeSubmission(id)
  }

  openDetailPengajuan = (item) => {
    this.props.navigation.navigate('DetailPengajuan', {
      id: item.id
    })
  }

  renderItem = ({ item, index }) => <ReportItem report={item} onPress={() => this.openDetailPengajuan(item)} onLikePress={() => this.likePengajuan(item.id)} />

  render () {
    return (
      <View style={styles.container}>
        <StatusBar />
        <FlatList
          refreshing={false}
          onRefresh={() => this.getMyApprovedSubmissions(1)}
          data={this.props.submissions}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderItem}
          contentContainerStyle={{ flexGrow: 1 }}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            <LoadingIndicator visible={this.props.fetching} size={'large'} />
          }
          ListEmptyComponent={<EmptyReport />}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav,
    fetching: state.submission.fetching,
    error: state.submission.error,
    submissions: state.submission.data,
    pagination: state.submission.pagination || {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    likeSubmission: id => dispatch(SubmissionActions.likeSubmission(id)),
    getMyApprovedSubmissions: page =>
      dispatch(SubmissionActions.getMyApprovedSubmissions(page)),
    resetSubmissions: () => dispatch(SubmissionActions.resetSubmissions())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Realisasi)
