import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Input, InputProps } from 'react-native-elements'
import { Fonts, Colors } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    marginBottom: 15
  },
  label: {
    fontFamily: Fonts.type.base,
    color: 'black',
    marginBottom: 10
  },
  input: {
    fontFamily: Fonts.type.base
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.lightGray
  }
})

const InputBox = props => (
  <Input
    {...props}
    labelStyle={[styles.label, props.labelStyle]}
    containerStyle={[styles.container, props.containerStyle]}
    inputStyle={[styles.input, props.inputStyle]}
    inputContainerStyle={[styles.inputContainer, props.inputContainerStyle]}
  />
)

InputBox.propTypes = {
  ...InputProps
}

export default InputBox
