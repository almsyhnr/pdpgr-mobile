import React, { Component } from 'react'
import { View, Image, FlatList, BackHandler, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

// redux
import SubmissionActions from '../../Redux/SubmissionRedux'

// components
import { StatusBar } from '../../Components/General'
import { NotificationButton } from '../../Components/Button'
import { ReportItem } from '../../Components/List'
import { LoadingIndicator } from '../../Components/Indicator'

// styles
import styles from './styles'
import { Images } from '../../Themes'

class Realisasi extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Realisasi',
      title: 'Realisasi',
      drawerIcon: ({focused}) => <Image source={Images.ic_realisasi} style={styles.sidebarIcon} />,
      headerRight: <NotificationButton onPress={() => navigation.navigate('Notifications')} />
    }
  }

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

  getMyApprovedSubmissions = (page) => {
    this.props.getMyApprovedSubmissions(page)
  }

  loadMore = () => {
    const { pagination } = this.props
    if (pagination.current_page < pagination.total_pages) {
      this.getMyApprovedSubmissions(pagination.current_page + 1)
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
          onRefresh={() => this.getMyApprovedSubmissions(1)}
          data={this.props.submissions}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderItem}
          contentContainerStyle={{flexGrow: 1}}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={<LoadingIndicator visible={this.props.fetching} size={'large'} />}
        />
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
    getMyApprovedSubmissions: page => dispatch(SubmissionActions.getMyApprovedSubmissions(page)),
    resetSubmissions: () => dispatch(SubmissionActions.resetSubmissions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Realisasi)
