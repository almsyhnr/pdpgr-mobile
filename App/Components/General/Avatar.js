import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'
import { StyleSheet, Image } from 'react-native'

class Avatar extends Component {
  state = { }
  render () {
    const { source, rounded, small, medium, large, xlarge } = this.props

    let { width, height } = this.props

    if (small) {
      width = 34
      height = 34
    } else if (medium) {
      width = 50
      height = 50
    } else if (large) {
      width = 75
      height = 75
    } else if (xlarge) {
      width = 150
      height = 150
    } else if (!width && !height) {
      width = 34
      height = 34
    } else if (!width) {
      width = height
    } else if (!height) {
      height = width
    }

    const styles = StyleSheet.create({
      avatar: {
        width: width,
        height: height
      }
    })

    return (
      <FastImage
        source={source}
        style={[
          styles.avatar,
          rounded && { borderRadius: width / 2 }
        ]}
        resizeMode={FastImage.resizeMode.contain} />
    )
  }
}

Avatar.propTypes = {
  source: Image.propTypes.source,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number
}

export default Avatar
