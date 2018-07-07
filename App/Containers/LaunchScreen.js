import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

// Styles
import styles from './Styles/LaunchScreenStyle'

class LaunchScreen extends Component {
  static navigationOptions = {
    header: null
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.success) {
      if (nextProps.accessToken) {
        this.openMainDrawer()
      } else {
        this.openLogin()
      }
    }
  }

  openMainDrawer = () => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'MainDrawerScreen',
            params: {}
          })
        ]
      })
    )
  }

  openLogin = () => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'LoginScreen',
            params: {}
          })
        ]
      })
    )
  }

  render () {
    return (
      <ScrollView style={styles.container} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    success: state.startup.success,
    accessToken: state.auth.accessToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
