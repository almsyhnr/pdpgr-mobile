import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  InteractionManager,
  Image
} from 'react-native'
import { connect } from 'react-redux'

// redux
import SubmissionActions from '../Redux/SubmissionRedux'

// Styles
import styles from './Styles/DetailPengajuanStyle'
import { LoadingIndicator } from '../Components/Indicator'

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

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.props.getSubmissionDetail(this.props.navigation.state.params.id)
    })
  }

  componentWillUnmount () {
    this.props.resetSubmissionDetail()
  }

  render () {
    const { submission, fetching } = this.props
    if (!submission) {
      return <LoadingIndicator visible={fetching} size={'large'} />
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
  return {
    submission: state.submission.selectedSubmission,
    fetching: state.submission.fetching,
    error: state.submission.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSubmissionDetail: id => dispatch(SubmissionActions.getSubmissionDetail(id)),
    resetSubmissionDetail: () => dispatch(SubmissionActions.resetSubmissionDetail())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPengajuan)
