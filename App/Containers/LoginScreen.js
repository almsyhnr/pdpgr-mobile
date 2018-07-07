import React, { Component } from 'react'
import { Text, Image, View, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

// components
import { Input } from '../Components/Form'
import { StatusBar } from '../Components/General'

// redux
import AuthActions from '../Redux/AuthRedux'

import { openUrl } from '../Lib/helpers'

// Styles
import styles from './Styles/LoginScreenStyles'
import { Images } from '../Themes'
import AppConfig from '../Config/AppConfig'
class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.fetching && this.props.fetching) {
      if (!nextProps.error && nextProps.accessToken) {
        this.openMainDrawer()
      }
    }
  }

  handleLogin = () => {
    const { email, password } = this.state
    if (email === '' || password === '') {
      return Alert.alert('Error', 'Email dan password wajib diisi')
    }

    this.props.signin(email, password)
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

  openForgot = () => {
    const url = `${AppConfig.baseUrl}/password/reset`
    openUrl(url)
  }
  render () {
    const { email, password } = this.state
    const { fetching } = this.props
    return (
      <View style={styles.mainContainer}>
        <StatusBar />
        <Image source={Images.peta} style={styles.footerImage} />
        <Image source={Images.logo} style={styles.logo} />
        <View style={styles.formContainer}>
          <Input
            placeholder='Email'
            inputStyle={styles.input}
            onChangeText={email => this.setState({ email })}
            value={email} />
          <Input placeholder='Password'
            onChangeText={password => this.setState({ password })}
            value={password} secureTextEntry inputStyle={styles.input} />
          <Button title='MASUK' buttonStyle={styles.button} onPress={this.handleLogin} loading={fetching} disabled={fetching} />
          <Text
            style={[styles.italicLink, styles.forgotPassword]}
            onPress={this.openForgot} hitSlop={styles.hitSlop}>Lupa kata sandi?</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    error: state.auth.error,
    fetching: state.auth.fetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signin: (email, password) => dispatch(AuthActions.signin(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
