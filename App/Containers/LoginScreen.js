import React, { Component } from 'react'
import { Text, Image, View, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'

// container
import { Input } from '../Components/Form'
import { StatusBar } from '../Components/General'
import { Button } from 'react-native-elements'

// Styles
import styles from './Styles/LoginScreenStyles'
import { Images } from '../Themes'

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props)
    this.openMainDrawer = this.openMainDrawer.bind(this)
    this.openForgot = this.openForgot.bind(this)
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
    Alert.alert('Info', 'This is just prototype')
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <StatusBar />
        <Image source={Images.peta} style={styles.footerImage} />
        <Image source={Images.logo} style={styles.logo} />
        <View style={styles.formContainer}>
          <Input placeholder='Username' inputStyle={styles.input} />
          <Input placeholder='Password' secureTextEntry inputStyle={styles.input} />
          <Button title='MASUK' buttonStyle={styles.button} onPress={this.openMainDrawer} />
          <Text
            style={[styles.italicLink, styles.forgotPassword]}
            onPress={this.openForgot} hitSlop={styles.hitSlop}>Lupa kata sandi?</Text>
        </View>
      </View>
    )
  }
}
