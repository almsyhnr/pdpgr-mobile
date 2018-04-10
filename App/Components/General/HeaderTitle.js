import React from 'react'
import PropTypes from 'prop-types'
import { Image, View, Text, StyleSheet } from 'react-native'
import { Colors, Images, Fonts } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 34,
    width: 34,
    resizeMode: 'contain'
  },
  text: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: 17,
    textAlign: 'center',
    marginHorizontal: 16
  }
})

const HeaderTitle = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={Images.icon} />
    <Text style={styles.text}>PDPGR</Text>
  </View>
)

export default HeaderTitle
