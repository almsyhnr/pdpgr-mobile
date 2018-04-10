import React from 'react'
import PropTypes from 'prop-types'
import Touchable from 'react-native-platform-touchable'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    maxWidth: Metrics.screenWidth / 2,
    paddingVertical: 10
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  image: {
    width: 150,
    height: 150
  },
  text: {
    fontFamily: Fonts.type.base,
    paddingVertical: 5
  }
})

const MainMenuItem = ({ title, image, onPress }) => (
  <Touchable onPress={onPress} style={styles.container}>
    <View style={styles.view}>
      <Image source={image} style={styles.image} resizeMode='contain' />
      <Text style={styles.text} >{title}</Text>
    </View>
  </Touchable>
)

MainMenuItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.any,
  onPress: PropTypes.func
}

export default MainMenuItem
