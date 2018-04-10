import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Images, Metrics } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    resizeMode: 'cover'
  }
})

const UnderDevelopment = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={Images.development} />
  </View>
)

export default UnderDevelopment
