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
import _ from 'lodash'
import { Badge } from 'react-native-elements'
import { TerminItem } from '../List'
import { formatMoney } from '../../Lib/helpers'

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
    backgroundColor: Colors.shadow,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.darkGray,
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
      <View style={styles.sectionContent}>
        <Text style={styles.label}>Jumlah Termin</Text>
        <Text style={styles.value}>{submission.termin}</Text>
        <Text style={styles.label}>Total Bantuan (Rp.)</Text>
        <Text style={styles.value}>{ formatMoney(submission.amount)}</Text>
      </View>

      {_.map(termins, (termin, index) => <TerminItem termin={termin} key={'termin_' + index} />)}
    </ScrollView>
  )
}

SubmissionTerminInfo.propTypes = {
  submission: PropTypes.object.isRequired,
  termins: PropTypes.object.isRequired
}

export default SubmissionTerminInfo
