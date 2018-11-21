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

const fieldInfo = (label, value) => {
  return (<View>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>)
}

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
        {fieldInfo('Jenis Bantuan', submission.module.name)}
        {fieldInfo('Nama Penerima Bantuan', submission.name)}
        {fieldInfo('NIK Penerima Bantuan', submission.identifier)}
        {submission.tgl_lahir != null && fieldInfo('Tanggal Lahir', submission.tgl_lahir)}
        {fieldInfo('Telp', submission.phone)}
        {fieldInfo('Email', submission.email)}
        {fieldInfo('Alamat', submission.address)}
        {submission.bantuan_tani != null && fieldInfo('Jenis Bantuan', submission.bantuan_tani_label)}
        {submission.bantuan_ternak != null && fieldInfo('Jenis Bantuan', submission.bantuan_ternak_label)}
        {submission.jenis_disabilitas != null && fieldInfo('Jenis Disabilitas', submission.jenis_disabilitas_label)}
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
