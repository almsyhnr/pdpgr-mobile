import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { Icon, Avatar, Badge } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'
import faker from 'faker'

import { TimeAgo } from '../General'
import { Colors, Fonts, Metrics, Images } from '../../Themes'
import { GalleryBadge } from '.'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.snow,
    marginBottom: 15
  },
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileContainer: {
    flex: 1,
    marginHorizontal: 10
  },
  reporter: {
    ...Fonts.style.h5
  },
  views: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.emphasis,
    color: Colors.gray
  },
  timeAgo: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.emphasis,
    color: Colors.gray
  },
  description: {
    fontFamily: Fonts.type.base,
    padding: 10,
    lineHeight: 16
  },
  mediaContainer: {
    height: Metrics.screenWidth * 0.6,
    width: Metrics.screenWidth
  },
  media: {
    height: Metrics.screenWidth * 0.6,
    width: Metrics.screenWidth,
    resizeMode: 'cover'
  },
  icon: {
    resizeMode: 'contain',
    backgroundColor: Colors.shadow
  },
  mediaIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: Colors.snow,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.primary,
    borderRadius: 15,
    zIndex: 100,
    padding: 3
  },
  footer: {
    padding: 10
  },
  comments: {
    fontFamily: Fonts.type.base,
    textAlign: 'right',
    color: Colors.gray
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
    borderColor: Colors.gray
  },
  footerAction: {
    flex: 1,
    alignItems: 'center'
  },
  footerImage: {
    width: 34,
    height: 34
  }
})

class ReportItem extends Component {
  state = { }
  render () {
    const { report } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Avatar
            medium
            rounded
            source={{ uri: report.creator.avatar }} />
          <View style={styles.profileContainer}>
            <Text style={styles.reporter}>{report.creator.name}</Text>
            {/* <Text style={styles.views}>{`${report.views} Views`}</Text> */}
          </View>
          <TimeAgo dateTime={report.created_at} textStyle={styles.timeAgo} showIcon={false} />
        </View>
        <View style={styles.body}>
          {report.galleries.length > 1 && <GalleryBadge value={report.galleries.length} />}
          <View style={styles.mediaContainer}>

            {report.galleries.length > 0
            ? <FlatList data={report.galleries}
              horizontal
              showsHorizontalScrollIndicator
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item, index }) => {
                let uri = item.url
                return (
                  <Image source={{uri: uri}} style={styles.media} />
                )
              }} />
              : <Image source={{ uri: report.module.icons.color }} style={[styles.media, styles.icon]} />}
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.comments}>
            0 Likes 0 Comments
        </Text>
          <View style={styles.actionContainer}>
            <Touchable style={styles.footerAction}>
              <Image source={Images.like} style={styles.footerImage} />
            </Touchable>
            <Touchable style={styles.footerAction}>
              <Image source={Images.comment} style={styles.footerImage} />
            </Touchable>
            <Touchable style={styles.footerAction}>
              <Image source={Images.lokasi} style={styles.footerImage} />
            </Touchable>
          </View>
        </View>
      </View>
    )
  }
}

ReportItem.propTypes = {
  report: PropTypes.object.isRequired
}

export default ReportItem
