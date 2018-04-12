import React, { Component } from 'react'
import { View, BackHandler, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Icon } from 'react-native-elements'

// components
import { StatusBar, HeaderTitle } from '../Components/General'
import { NotificationButton, AddReportButton } from '../Components/Button'

// Styles
import styles from './Styles/HomeScreenStyle'
import { Colors, Images } from '../Themes'

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
    this._backHandler = this._backHandler.bind(this)
  }

  componentDidMount () {
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

  render () {
    return (
      <View style={styles.container}>
        <StatusBar />
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
