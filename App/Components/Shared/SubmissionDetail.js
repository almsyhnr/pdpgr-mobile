import React, { Component } from 'react'
import {
  Alert,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'
import { Badge, Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'

import SubmissionActions from '../../Redux/SubmissionRedux'

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

class SubmissionDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      laporan: null,
      itemLaporan: props.submission.module.id === 2 ? [
        {
          label: 'Meninggal',
          value: 'meninggal'
        },
        {
          label: 'Pindah',
          value: 'pindah'
        }
      ] : [{
        label: 'Sembuh',
        value: 'sembuh'
      }]
    }
  }

  onReport = () => {
    if (!this.state.laporan) {
      return Alert.alert('Error', 'Pilih jenis laporan')
    }
    this.props.reportSubmission({
      submission_id: this.props.submission.id,
      laporan: this.state.laporan
    })
  }

  fieldInfo = (label, value) => {
    return (<View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>)
  }

  render () {
    const { submission, user, posting } = this.props
    if (!submission) {
      return null
    }

    const isOwner = user.id === submission.creator.id

    const canReport = submission.module.id === 2 || submission.module.id === 9
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFO</Text>
        </View>
        <View style={styles.sectionContent}>
          {this.fieldInfo('Jenis Bantuan', submission.module.name)}
          {this.fieldInfo('Nama Penerima Bantuan', submission.name)}
          {this.fieldInfo('NIK Penerima Bantuan', submission.identifier)}
          {submission.tgl_lahir != null && this.fieldInfo('Tanggal Lahir', submission.tgl_lahir)}
          {this.fieldInfo('Telp', submission.phone)}
          {this.fieldInfo('Email', submission.email)}
          {this.fieldInfo('Alamat', submission.address)}
          {submission.bantuan_tani != null && this.fieldInfo('Jenis Bantuan', submission.bantuan_tani_label)}
          {submission.bantuan_ternak != null && this.fieldInfo('Jenis Bantuan', submission.bantuan_ternak_label)}
          {submission.jenis_disabilitas != null && this.fieldInfo('Jenis Disabilitas', submission.jenis_disabilitas_label)}
          {submission.jenis_nelayan != null && this.fieldInfo('Jenis Nelayan', submission.jenis_nelayan_label)}
          {submission.bantuan_nelayan != null && this.fieldInfo('Jenis Bantuan', submission.bantuan_nelayan_label)}
          {submission.luas_rumah != null && this.fieldInfo('Luas Rumah', submission.luas_rumah)}
          {submission.jumlah_penghuni_rumah != null && this.fieldInfo('Jumlah Penghuni Rumah', submission.jumlah_penghuni_rumah)}
          {submission.material_atap_terluas_rm != null && this.fieldInfo('Material Atap Terluas', submission.material_atap_terluas_rm)}
          {submission.kondisi_atap_rm != null && this.fieldInfo('Kondisi Atap', submission.kondisi_atap_rm)}
          {submission.material_dinding_terluas_rm != null && this.fieldInfo('Material Dinding Terluas', submission.material_dinding_terluas_rm)}
          {submission.kondisi_dinding_rm != null && this.fieldInfo('Kondisi Dinding', submission.kondisi_dinding_rm)}
          {submission.material_lantai_terluas_rm != null && this.fieldInfo('Material Lantai Terluas', submission.material_lantai_terluas_rm)}
          {submission.kondisi_lantai_rm != null && this.fieldInfo('Kondisi Lantai', submission.kondisi_lantai_rm)}

          {submission.kepemilikan_jamban != null && this.fieldInfo('Kepemilikan Jamban', submission.kepemilikan_jamban)}

          {submission.sumber_air_minum != null && this.fieldInfo('Sumber Air Minum', submission.sumber_air_minum)}
          {submission.jarak_sumber_air_tpa != null && this.fieldInfo('Jarak Sumber Air Minum ke TPA Tinja', submission.jarak_sumber_air_tpa)}
          {submission.sumber_listrik_jamban != null && this.fieldInfo('Sumber Listrik', submission.sumber_listrik_jamban)}

        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
        </View>
        <View style={styles.sectionContent}>
          <Badge
            value={submission.status}
            textStyle={{ fontFamily: Fonts.type.base }}
            containerStyle={{
              backgroundColor: submission.status_color,
              marginBottom: 10
            }}
          />
          {submission.sembuh === 1 && <Badge
            value='Sembuh'
            textStyle={{ fontFamily: Fonts.type.base }}
            containerStyle={{
              backgroundColor: Colors.primary
            }}
          />}
          {submission.is_death === 1 && <Badge
            value='Meninggal'
            textStyle={{ fontFamily: Fonts.type.base }}
            containerStyle={{
              backgroundColor: Colors.primary
            }}
          />}
          {submission.is_moved === 1 && <Badge
            value='Pindah'
            textStyle={{ fontFamily: Fonts.type.base }}
            containerStyle={{
              backgroundColor: Colors.primary
            }}
          />}

        </View>
        {isOwner && canReport && (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aksi</Text>
          </View>
          <View style={styles.sectionContent}>
            <RNPickerSelect
              placeholder={{
                label: 'Laporkan Penerima Bantuan',
                value: null
              }}
              items={this.state.itemLaporan}
              onValueChange={(value) => {
                this.setState({ laporan: value })
              }}
              value={this.state.laporan}
              style={{ ...pickerSelectStyles }}
                />
            <Button
              title='Laporkan'
              disabled={posting}
              loading={posting}
              buttonStyle={{ borderRadius: 0, backgroundColor: Colors.primary }}
              onPress={this.onReport}
              />
          </View>
        </View>)}
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
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: 'white',
    color: 'black'
  }
})

const mapStateToProps = state => {
  return {
    submission: state.submission.selected,
    fetching: state.submission.fetching,
    error: state.submission.error,
    user: state.user.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSubmissionDetail: id => dispatch(SubmissionActions.getSubmissionDetail(id)),
    reportSubmission: form => dispatch(SubmissionActions.reportSubmission(form))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionDetail)
