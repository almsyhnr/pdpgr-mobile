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
import { Badge } from 'react-native-elements'
import { Fonts } from '../Themes'
import { SubmissionDetail } from '../Components/Shared'

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
      <SubmissionDetail submission={submission} />
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
