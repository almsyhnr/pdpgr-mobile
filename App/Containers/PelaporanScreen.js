import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'

import { StatusBar, UnderDevelopment } from '../Components/General'
import { NotificationButton } from '../Components/Button'

// Styles
import styles from './Styles/PelaporanScreenStyle'

class PelaporanScreen extends Component {
  static navigationOptions = {
    title: 'Laporan',
    headerRight: <NotificationButton />
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <StatusBar />
        <UnderDevelopment />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PelaporanScreen)
