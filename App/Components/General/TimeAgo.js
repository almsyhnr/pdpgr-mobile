import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import Moment from 'moment'
import { Icon } from 'react-native-elements'

import { Colors } from '../../Themes'

const styles = StyleSheet.create({
  timeIndicator: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10
  },
  icon: {
    marginRight: 5,
    color: Colors.darkGray
  },
  text: {
    color: Colors.darkGray
  }
})

Moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%ds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%dd',
    M: 'a month',
    MM: '%dmo',
    y: 'a year',
    yy: '%dy'
  }
})

class TimeAgo extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      counter: 0
    }
    this.timer = null
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      const { counter } = this.state
      this.setState({ counter: counter + 1 })
    }, 60000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  componentDidUpdate (prevProps, prevState) {
    // console.tron.error('Time ago updated')
  }

  render () {
    return (
      <View style={[styles.timeIndicator, this.props.style]}>
        {this.props.showIcon && (
          <Icon
            type='material-icons'
            name='access-time'
            size={20}
            style={styles.icon}
            color={Colors.darkGray}
          />
        )}
        <Text style={[styles.text, this.props.textStyle]}>
          {Moment(this.props.dateTime).fromNow()}
        </Text>
      </View>
    )
  }
}

TimeAgo.propTypes = {
  dateTime: PropTypes.string,
  showIcon: PropTypes.bool,
  textStyle: PropTypes.any
}

TimeAgo.defaultProps = {
  dateTime: Moment().toISOString(),
  showIcon: true
}

export default TimeAgo
