import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'

// components
import { StatusBar } from '../Components/General'

// Styles
import styles from './Styles/HomeScreenStyle'
import { Colors } from '../Themes'

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Home',
      title: 'PDPGR',
      drawerIcon: ({focused}) => <Icon name='home' color={Colors.gray} />
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <StatusBar />
        <Text>HomeScreen Container</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
