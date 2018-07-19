import React, { Component } from 'react'
import { View, FlatList, InteractionManager, BackHandler, Image } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Icon } from 'react-native-elements'

// redux
import SubmissionActions from '../Redux/SubmissionRedux'

// components
import { StatusBar } from '../Components/General'
import { NotificationButton, AddReportButton } from '../Components/Button'
import { ReportItem } from '../Components/List'

// Styles
import styles from './Styles/PengajuanSayaStyle'

import { Colors, Images } from '../Themes'
import { LoadingIndicator } from '../Components/Indicator'

class PengajuanSaya extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Pengajuan Saya',
      title: 'Pengajuan Saya',
      drawerIcon: ({focused}) => <Image source={Images.ic_pengajuan_saya} style={styles.sidebarIcon} />,
      headerRight: <NotificationButton onPress={() => navigation.navigate('Notifications')} />
    }
  }

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
  }

  getSubmissions = (page) => {
    this.props.getMySubmissions(page)
  }

  loadMore = () => {
    const { pagination } = this.props
    if (pagination.current_page < pagination.total_pages) {
      this.getSubmissions(pagination.current_page + 1)
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

  renderItem = ({ item, index }) => <ReportItem report={item} />

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
          contentContainerStyle={{flexGrow: 1}}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={<LoadingIndicator visible={this.props.fetching} size={'large'} />}
        />
        <AddReportButton />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
    fetching: state.submission.fetching,
    error: state.submission.error,
    submissions: state.submission.submissions,
    pagination: state.submission.submissionsPagination
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMySubmissions: page => dispatch(SubmissionActions.getMySubmissions(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PengajuanSaya)
