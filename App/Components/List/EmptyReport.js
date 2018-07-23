import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { Images, Metrics, Fonts } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.navBarHeight,
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

const EmptyReport = () => (
  <View style={styles.container}>
    <Image source={Images.ic_pengajuan_kosong} style={styles.image} />
    <Text style={styles.text}>Tidak ada pengajuan</Text>
  </View>
)

export default EmptyReport
