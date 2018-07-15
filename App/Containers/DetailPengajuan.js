import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailPengajuanStyle'

class DetailPengajuan extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Detail Pengajuan'
    }
  };

  constructor (props) {
    super(props)
    this.state = {
      submission: props.navigation.state.params.submission
    }
  }

  render () {
    const { submission } = this.state
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
                    <Image source={{ uri: uri }} style={styles.media} />
                  </TouchableWithoutFeedback>
                )
              }}
            />
          ) : (
            <Image
              source={{ uri: submission.module.icons.color }}
              style={[styles.media, styles.icon]}
            />
          )}
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPengajuan)
