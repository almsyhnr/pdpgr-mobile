import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'
import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 7
  }
})

class NotificationButton extends Component {
  state = { }
  render () {
    return (

      <Touchable onPress={this.props.onPress} style={styles.container}>
        <Icon name='notifications' color={Colors.snow} />
      </Touchable>
    )
  }
}

NotificationButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, null)(NotificationButton)
