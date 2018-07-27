import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Metrics, Fonts, Images } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.navBarHeight - 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: Metrics.screenWidth / 2,
    height: Metrics.screenWidth / 2
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: 16
  }
})

const EmptyForum = () => (
  <View style={styles.container}>
    <Image source={Images.forum} style={styles.image} />
    <Text style={styles.text}>Tidak ada thread</Text>
  </View>
)

export default EmptyForum
