import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Images } from '../../Themes'

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  }
})

const ForumItem = ({ forum, onPress }) => {
  const leftElement = <Image source={Images.forum} style={styles.image} />
  const rightElement = <View>
    <Text>Views: {forum.views}</Text>
    <Text>Replies: {forum.reply_count}</Text>
  </View>
  return (
    <ListItem title={forum.title} leftElement={leftElement} rightElement={rightElement} />
  )
}

ForumItem.propTypes = {
  forum: PropTypes.object.isRequired,
  onPress: PropTypes.func
}

export default ForumItem
