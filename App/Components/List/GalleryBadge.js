import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Badge } from 'react-native-elements'
import { Colors, Fonts } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    width: 40,
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 400
  },
  badgeContainer: {
    backgroundColor: Colors.primary
  },
  badgeText: {
    fontFamily: Fonts.type.base
  }
})
const GalleryBadge = ({ value }) => (
  <View style={styles.container}>
    <Badge value={value} containerStyle={styles.badgeContainer} textStyle={styles.badgeText} />
  </View>
)

GalleryBadge.propTypes = {
  value: PropTypes.number.isRequired
}

export default GalleryBadge
