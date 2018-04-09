import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Touchable from 'react-native-platform-touchable'
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  }
})

const DrawerButton = ({ navigation }) => (
  <Touchable onPress={() => { navigation.navigate('DrawerToggle') }} style={styles.container}>
    <Icon name='menu' size={25} color='white' />
  </Touchable>
)

DrawerButton.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default DrawerButton
