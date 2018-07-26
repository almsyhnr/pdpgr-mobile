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

class NotificationButton extends Component {
  state = { }
  render () {
    return (

      <Touchable onPress={this.props.onPress} >
        <View style={styles.container}>
          <Icon name='notifications' color={Colors.snow} />
          <Text style={styles.text}>{this.props.unread}</Text>
        </View>

      </Touchable>
    )
  }
}

NotificationButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    unread: state.notification.unread
  }
}

export default connect(mapStateToProps, null)(NotificationButton)
