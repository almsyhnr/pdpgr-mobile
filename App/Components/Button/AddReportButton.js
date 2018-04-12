import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Colors } from '../../Themes'
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
})

const AddReportButton = ({ navigation }) => (
  <Touchable onPress={() => navigation.navigate('ReportChooserScreen')} style={styles.container}>
    <Icon name='add-circle' type='ionicons' color={Colors.green} size={50} />
  </Touchable>
)

export default withNavigation(AddReportButton)
