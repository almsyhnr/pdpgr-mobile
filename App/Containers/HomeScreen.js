import React, { Component } from 'react'
import { View, BackHandler, FlatList, Text } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Icon } from 'react-native-elements'

// components
import { StatusBar, HeaderTitle } from '../Components/General'
import { NotificationButton, AddReportButton } from '../Components/Button'
import { ReportItem } from '../Components/List'

// Styles
import styles from './Styles/HomeScreenStyle'
import { Colors, Images } from '../Themes'

const reports = require('../Fixtures/laporan.json')

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Beranda',
      headerTitle: <HeaderTitle />,
      drawerIcon: ({focused}) => <Icon name='home' color={Colors.gray} />,
      headerRight: <NotificationButton />
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      reports: []
    }
    this._backHandler = this._backHandler.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  componentDidMount () {
    this.setState({ reports })
    BackHandler.addEventListener('hardwareBackPress', this._backHandler)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._backHandler)
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
          data={this.state.reports}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderItem}
          contentContainerStyle={{flexGrow: 1}}
        />
        <AddReportButton />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
