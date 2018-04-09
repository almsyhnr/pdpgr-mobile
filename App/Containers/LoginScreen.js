import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images, Metrics } from '../Themes'

// container
import { Input } from '../Components/Form'
import { StatusBar } from '../Components/General'
import { Button } from 'react-native-elements'

// Styles
import styles from './Styles/LoginScreenStyles'

export default class LoginScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <StatusBar />
        <Image source={Images.peta} style={styles.footerImage} />
        <Image source={Images.logo} style={styles.logo} />
        <View style={styles.formContainer}>
          <Input placeholder='Username' />
          <Input placeholder='Password' />
          <Button title='MASUK' buttonStyle={styles.button} />
          <Text style={[styles.italicLink, styles.forgotPassword]}>Lupa kata sandi?</Text>
        </View>
      </View>
    )
  }
}
