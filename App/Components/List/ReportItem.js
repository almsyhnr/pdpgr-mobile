import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import { Icon, Badge } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'
import FastImage from 'react-native-fast-image'

import { TimeAgo, Avatar } from '../General'
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
    margin: 10
  },
  reporter: {
    ...Fonts.style.h5,
    fontSize: 16
  },
  views: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.emphasis,
    color: Colors.gray
  },
  timeAgo: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.emphasis,
    color: Colors.darkGray
  },
  description: {
    fontFamily: Fonts.type.base,
    padding: 10,
    lineHeight: 16
  },
  mediaContainer: {
    height: Metrics.screenWidth,
    width: Metrics.screenWidth
  },
  media: {
    height: Metrics.screenWidth,
    width: Metrics.screenWidth,
    resizeMode: 'contain',
    backgroundColor: Colors.shadow
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
    color: Colors.darkGray
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
    borderColor: Colors.darkGray
  },
  footerAction: {
    flex: 1,
    alignItems: 'center'
  },
  footerImage: {
    width: 34,
    height: 34
  },
  body: {
    borderTopWidth: 1,
    paddingTop: 10
  },
  status_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10
  }
})

class ReportItem extends Component {
  state = {};
  render () {
    const { report, onPress } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Avatar small rounded source={{ uri: report.creator.avatar }} />
          <View style={styles.profileContainer}>
            <Text style={styles.reporter}>{report.creator.name}</Text>
          </View>
          <TimeAgo
            dateTime={report.created_at}
            textStyle={styles.timeAgo}
            showIcon={false}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.status_container}>
            <Text style={{ fontWeight: 'bold', fontFamily: Fonts.type.bold }}>
              {report.module.name}
            </Text>
            <Badge
              value={report.status}
              textStyle={{ fontFamily: Fonts.type.base }}
              containerStyle={{
                backgroundColor: report.status_color,
                marginLeft: 10
              }}
            />
          </View>
          <View style={styles.status_container}>
            <Icon name='user' type='entypo' size={20} color={Colors.darkGray} />
            <Text style={{ marginLeft: 10, fontFamily: Fonts.type.base }}>
              {report.name}
            </Text>
          </View>
        </View>
        <View>
          {report.galleries.length > 1 && (
            <GalleryBadge value={report.galleries.length} />
          )}
          <View
            style={styles.mediaContainer}
            onStartShouldSetResponder={() => true}
          >
            {report.galleries.length > 0 ? (
              <FlatList
                data={report.galleries}
                horizontal
                showsHorizontalScrollIndicator
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item, index }) => {
                  let uri = item.url
                  return (
                    <TouchableWithoutFeedback onPress={onPress}>
                      <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        source={{ uri: uri }}
                        style={styles.media}
                      />
                    </TouchableWithoutFeedback>
                  )
                }}
              />
            ) : (
              <TouchableWithoutFeedback onPress={onPress}>
                <FastImage
                  source={{ uri: report.module.icons.color }}
                  style={[styles.media, styles.icon]}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.comments}>0 Likes 0 Comments</Text>
          <View style={styles.actionContainer}>
            <Touchable style={styles.footerAction} onPress={onPress}>
              <Image source={Images.like} style={styles.footerImage} />
            </Touchable>
            <Touchable style={styles.footerAction} onPress={onPress}>
              <Image source={Images.comment} style={styles.footerImage} />
            </Touchable>
            <Touchable style={styles.footerAction} onPress={onPress}>
              <Image source={Images.lokasi} style={styles.footerImage} />
            </Touchable>
          </View>
        </View>
      </View>
    )
  }
}

ReportItem.propTypes = {
  report: PropTypes.object.isRequired,
  onPress: PropTypes.func
}

export default ReportItem
