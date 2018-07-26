import React, { Component } from 'react'
import {
  View,
  FlatList,
  InteractionManager,
  BackHandler,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

// redux
import SubmissionActions from '../Redux/SubmissionRedux'

// components
import { StatusBar } from '../Components/General'
import { NotificationButton, AddReportButton } from '../Components/Button'
import { LoadingIndicator } from '../Components/Indicator'
import { ReportItem, EmptyReport } from '../Components/List'

// Styles
import styles from './Styles/PengajuanSayaStyle'

import { Images } from '../Themes'

class PengajuanSaya extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Pengajuan Saya',
      title: 'Pengajuan Saya',
      drawerIcon: ({ focused }) => (
        <Image source={Images.ic_pengajuan_saya} style={styles.sidebarIcon} />
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
    this.state = {
      submissions: []
    }
    this._backHandler = this._backHandler.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  componentWillMount () {
    InteractionManager.runAfterInteractions(() => {
      this.getSubmissions(1)
    })
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this._backHandler)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._backHandler)
    this.props.resetSubmissions()
  }

  getSubmissions = page => {
    this.props.getMySubmissions(page)
  };

  loadMore = () => {
    const { pagination } = this.props
    if (pagination.current_page < pagination.total_pages) {
      this.getSubmissions(pagination.current_page + 1)
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

  openDetailPengajuan = item => {
    this.props.navigation.navigate('DetailPengajuan', {
      id: item.id
    })
  };

  openKomentar = item => {
    this.props.navigation.navigate('KomentarScreen', {
      id: item.id
    })
  };

  likePengajuan = id => {
    this.props.likeSubmission(id)
  };

  renderItem = ({ item, index }) => (
    <ReportItem
      report={item}
      onPress={() => this.openDetailPengajuan(item)}
      onLikePress={() => this.likePengajuan(item.id)}
      onCommentPress={() => this.openKomentar(item)}
    />
  );

  render () {
    return (
      <View style={styles.container}>
        <StatusBar />
        <FlatList
          refreshing={false}
          onRefresh={() => this.getSubmissions(1)}
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
        <AddReportButton />
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
    pagination: state.submission.pagination
  }
}

const mapDispatchToProps = dispatch => {
  return {
    likeSubmission: id => dispatch(SubmissionActions.likeSubmission(id)),
    getMySubmissions: page =>
      dispatch(SubmissionActions.getMySubmissions(page)),
    resetSubmissions: () => dispatch(SubmissionActions.resetSubmissions())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PengajuanSaya)
