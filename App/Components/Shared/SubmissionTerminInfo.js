import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import { Fonts, Colors, Metrics } from '../../Themes'
import { Badge } from 'react-native-elements'

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

const SubmissionTerminInfo = ({ submission, termins }) => {
  if (!submission || !termins) {
    return null
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>INFO</Text>
      </View>
      <View style={styles.sectionContent}>
        <Text style={styles.label}>Jenis Bantuan</Text>
        <Text style={styles.value}>test</Text>
      </View>
    </ScrollView>
  )
}

SubmissionTerminInfo.propTypes = {
  submission: PropTypes.object.isRequired,
  termins: PropTypes.object.isRequired
}

export default SubmissionTerminInfo
