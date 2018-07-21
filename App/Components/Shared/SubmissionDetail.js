import React from 'react'
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'
import { Badge } from 'react-native-elements'

import { Fonts, Colors, Metrics } from '../../Themes'

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.snow,
    marginBottom: 1
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 10,
    color: Colors.darkGray
  },
  sectionContent: {
    backgroundColor: Colors.snow,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20
  },
  label: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.base,
    marginBottom: 5
  },
  value: {
    fontSize: 16,
    fontFamily: Fonts.type.base,
    color: Colors.darkGray,
    marginBottom: 20
  },
  mediaContainer: {
    height: Metrics.screenWidth,
    width: Metrics.screenWidth
  },
  media: {
    height: Metrics.screenWidth / 4,
    width: Metrics.screenWidth / 4,
    resizeMode: 'contain',
    backgroundColor: Colors.shadow,
    marginHorizontal: 5
  }
})

const SubmissionDetail = ({ submission }) => {
  if (!submission) {
    return null
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>INFO</Text>
      </View>
      <View style={styles.sectionContent}>
        <Text style={styles.label}>Jenis Bantuan</Text>
        <Text style={styles.value}>{submission.module.name}</Text>
        <Text style={styles.label}>Nama Penerima Bantuan</Text>
        <Text style={styles.value}>{submission.name}</Text>
        <Text style={styles.label}>NIK Penerima Bantuan</Text>
        <Text style={styles.value}>{submission.identifier}</Text>
        <Text style={styles.label}>Telp</Text>
        <Text style={styles.value}>{submission.phone}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{submission.email}</Text>
        <Text style={styles.label}>Alamat</Text>
        <Text style={styles.value}>{submission.address}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
      </View>
      <View style={styles.sectionContent}>
        <Badge
          value={submission.status}
          textStyle={{ fontFamily: Fonts.type.base }}
          containerStyle={{
            backgroundColor: submission.status_color
          }}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gambar</Text>
      </View>
      <View style={styles.sectionContent}>
        {submission.galleries.length > 0 ? (
          <FlatList
            data={submission.galleries}
            numColumns={3}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => {
              let uri = item.url
              return (
                <TouchableWithoutFeedback>
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
          <FastImage
            source={{ uri: submission.module.icons.color }}
            style={[styles.media, styles.icon]}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </View>
    </ScrollView>
  )
}

SubmissionDetail.propTypes = {
  submission: PropTypes.object.isRequired
}

export default SubmissionDetail
