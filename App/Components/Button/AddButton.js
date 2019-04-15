import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Badge } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'
import { StyleSheet, View, Text } from 'react-native'
import { Colors } from '../../Themes'
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 7,
    flexDirection: 'row'
  },
  text: {
    color: Colors.snow
  }
})

class AddButton extends Component {
  state = { }
  render () {
    return (
      <Touchable onPress={this.props.onPress} >
        <View style={styles.container}>
          <Icon name='add' color={Colors.snow} />
        </View>
      </Touchable>
    )
  }
}

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default AddButton
