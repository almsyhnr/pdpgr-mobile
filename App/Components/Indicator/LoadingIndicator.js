import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import PropTypes from 'prop-types'

const LoadingIndicator = (props) => {
  if (!props.visible) {
    return null
  }

  return <ActivityIndicator {...props} />
}

LoadingIndicator.propTypes = {
  ...ActivityIndicatorProps,
  visible: PropTypes.bool
}

export default LoadingIndicator
