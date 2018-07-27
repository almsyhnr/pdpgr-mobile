import React from 'react'
import { Icon } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'
import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.snow,
    borderRadius: 30
  }
})

const AddForumButton = ({ onPress }) => (
  <Touchable onPress={onPress} style={styles.container}>
    <Icon name='add-circle' type='ionicons' color={Colors.green} size={50} />
  </Touchable>
)

export default AddForumButton
