import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes'
import { Icon } from 'react-native-elements'

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

const EmptyNotification = () => (
  <View style={styles.container}>
    <Icon name='notifications-off' size={200} color={Colors.darkGray} />
    <Text style={styles.text}>Tidak ada notifikasi</Text>
  </View>
)

export default EmptyNotification
