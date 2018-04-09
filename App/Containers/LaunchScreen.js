import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images, Metrics } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.peta} style={styles.footerImage} />
      </View>
    )
  }
}
