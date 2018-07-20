import React, { Component } from 'react'
import { InteractionManager, Text } from 'react-native'
import { connect } from 'react-redux'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'

// redux
import SubmissionActions from '../../Redux/SubmissionRedux'
import SubmissionTerminActions from '../../Redux/SubmissionTerminRedux'
import SubmissionTransactionActions from '../../Redux/SubmissionTransactionRedux'

import styles from './styles'
import { SubmissionDetail } from '../../Components/Shared'
import { Metrics, Colors, Fonts } from '../../Themes'

class DetailRealisasi extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Detail Realisasi'
    }
  }
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
      const submissionId = this.props.navigation.state.params.id
      this.props.getSubmissionDetail(submissionId)
      this.props.getSubmissionTermins(submissionId)
      this.props.getSubmissionTransactions(submissionId)
    })
  }

  componentWillUnmount () {
    this.props.resetSubmissionDetail()
  }
  render () {
    const { submission } = this.props
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => <SubmissionDetail submission={submission} />,
          second: () => <Text>Second</Text>,
          third: () => <Text>Third</Text>
        })}
        renderTabBar={props =>
          <TabBar
            {...props}
            style={{ backgroundColor: 'black' }}
            labelStyle={{ color: Colors.snow, fontFamily: Fonts.type.base }}
            indicatorStyle={{ backgroundColor: Colors.primary, height: 3 }}
            />
}
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
    error: state.submission.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSubmissionDetail: id => dispatch(SubmissionActions.getSubmissionDetail(id)),
    getSubmissionTermins: id => dispatch(SubmissionTerminActions.getSubmissionTermins(id)),
    getSubmissionTransactions: id => dispatch(SubmissionTransactionActions.getSubmissionTransactions(id)),
    resetSubmissionDetail: () => dispatch(SubmissionActions.resetSubmissionDetail())
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailRealisasi)
