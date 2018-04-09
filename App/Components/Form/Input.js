import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Platform, TextInput, StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes'
const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 50 : 60,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    width: '100%',
    borderColor: Colors.shadow,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.snow,
    marginBottom: 15
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.emphasis
  }
})

const Input = (props) => (
  <View style={styles.container}>
    <TextInput
      style={styles.text}
      underlineColorAndroid='transparent'
      placeholder={props.placeholder} />
  </View>
)

Input.propTypes = {
  placeholder: PropTypes.string
}

export default Input
