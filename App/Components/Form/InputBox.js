import React, { Component } from 'react'
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

class InputBox extends Component {
  state = { }
  render () {
    return (
      <Input
        {...this.props}
        ref={this.props.inputRef}
        autoCorrect={false}
        labelStyle={[styles.label, this.props.labelStyle]}
        containerStyle={[styles.container, this.props.containerStyle]}
        inputStyle={[styles.input, this.props.inputStyle]}
        inputContainerStyle={[styles.inputContainer, this.props.inputContainerStyle]}
  />
    )
  }
}

InputBox.propTypes = {
  ...InputProps,
  inputRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
}

export default InputBox
