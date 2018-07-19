import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Avatar, Badge } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'
import { TimeAgo } from '../General'
import { Images, Colors } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  content: {
    flex: 1,
    marginLeft: 10
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 40,
    alignItems: 'center'
  },
  time: {
    fontSize: 12
  },
  typeContaniner: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  badge: {
    marginLeft: 5,
    width: 10,
    height: 10,
    backgroundColor: Colors.darkGreen,
    borderRadius: 10
  }
})

class NotificationItem extends Component {
  state = { }

  render () {
    const { data, onPress } = this.props
    let avatar = Images.ic_realisasi
    if (data.type === 'pengajuan') {
      avatar = Images.ic_pengajuan_saya
    }

    let avatarStyle = {}
    if (!data.read) {
      avatarStyle.tintColor = Colors.green
    }
    return (
      <Card>
        <Touchable onPress={onPress}>
          <View style={styles.container}>
            <Avatar rounded source={avatar} />
            <View style={styles.content}>
              <View style={styles.firstRow}>
                <View style={styles.typeContaniner}>
                  <Text>{ _.startCase(data.type)}</Text>

                  {!data.read && <View style={styles.badge} />}
                </View>

                <TimeAgo dateTime={data.created_at} showIcon={false} textStyle={styles.time} />
              </View>
              <Text>{data.message}</Text>
            </View>
          </View>
        </Touchable>

      </Card>
    )
  }
}

NotificationItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func
}

export default NotificationItem
