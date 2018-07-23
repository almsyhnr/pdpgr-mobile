import React, { Component } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'

// redux
import SubmissionActions from '../../Redux/SubmissionRedux'
import SubmissionTerminActions from '../../Redux/SubmissionTerminRedux'
import SubmissionTransactionActions from '../../Redux/SubmissionTransactionRedux'

// components
import {
  SubmissionDetail,
  SubmissionTerminInfo
} from '../../Components/Shared'
import { Metrics, Colors, Fonts } from '../../Themes'
import SubmissionTransactions from '../../Components/Shared/SubmissionTransactions'

import styles from './styles'

class DetailRealisasi extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Detail Realisasi'
    }
  };
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Penerima' },
      { key: 'second', title: 'Dana' },
      { key: 'third', title: 'Item' }
    ]
  };

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.getAllData()
    })
  }

  getAllData = () => {
    const submissionId = this.props.navigation.state.params.id
    this.props.getSubmissionDetail(submissionId)
    this.props.getSubmissionTermins(submissionId)
    this.props.getSubmissionTransactions(submissionId)
  };

  componentWillUnmount () {
    this.props.resetSubmissionDetail()
  }

  submitTermin = terminId => {
    const submissionId = this.props.navigation.state.params.id
    this.props.submitSubmissionTermin(submissionId, terminId)
  };

  render () {
    const { submission, termins, transactions } = this.props
    return (
      <TabView
        swipeEnabled={false}
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => <SubmissionDetail submission={submission} />,
          second: () => (
            <SubmissionTerminInfo
              submission={submission}
              termins={termins}
              onSubmit={terminId => this.submitTermin(terminId)}
            />
          ),
          third: () => (
            <SubmissionTransactions
              submission={submission}
              termins={termins}
              transactions={transactions}
            />
          )
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{ backgroundColor: 'black' }}
            labelStyle={{ color: Colors.snow, fontFamily: Fonts.type.base }}
            indicatorStyle={{ backgroundColor: Colors.primary, height: 3 }}
          />
        )}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Metrics.screenWidth }}
      />
    )
  }
}
const mapStateToProps = state => {
  return {
    submission: state.submission.selected,
    termins: state.submissionTermin.data,
    transactions: state.submissionTransaction.data,
    fetching: state.submission.fetching,
    posting: state.submissionTermin.posting,
    failure: state.submissionTermin.error,
    error: state.submission.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSubmissionDetail: id =>
      dispatch(SubmissionActions.getSubmissionDetail(id)),
    getSubmissionTermins: id =>
      dispatch(SubmissionTerminActions.getSubmissionTermins(id)),
    submitSubmissionTermin: (submissionId, id) =>
      dispatch(
        SubmissionTerminActions.submitSubmissionTermin(submissionId, id)
      ),
    getSubmissionTransactions: id =>
      dispatch(SubmissionTransactionActions.getSubmissionTransactions(id)),
    resetSubmissionDetail: () =>
      dispatch(SubmissionActions.resetSubmissionDetail())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailRealisasi)
