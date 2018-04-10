import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'
import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 7
  }
})

const NotificationButton = () => (
  <Touchable onPress={() => alert('Notification')} style={styles.container}>
    <Icon name='notifications' color={Colors.snow} />
  </Touchable>
)

export default NotificationButton
