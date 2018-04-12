import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { Images, Metrics, Fonts } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: Metrics.screenWidth / 2,
    height: Metrics.screenWidth / 2,
    resizeMode: 'contain'
  },
  text: {
    ...Fonts.style.h5,
    marginTop: 20
  }
})

const UnderDevelopment = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={Images.development} />
    <Text style={styles.text}>This screen under development</Text>
  </View>
)

export default UnderDevelopment
