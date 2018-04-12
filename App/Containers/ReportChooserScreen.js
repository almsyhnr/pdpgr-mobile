import React, { Component } from 'react'
import { View, BackHandler, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Icon } from 'react-native-elements'

// components
import { StatusBar, HeaderTitle } from '../Components/General'
import { NotificationButton } from '../Components/Button'
import { MainMenuItem } from '../Components/Menu'

// Styles
import { Colors, Images } from '../Themes'
import styles from './Styles/ReportChooserScreenStyle'

class ReportChooserScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pilih Laporan',
      headerRight: <NotificationButton />
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      menu: [
        {
          title: 'Fasilitas Sekolah',
          image: Images.facility
        },
        {
          title: 'Bedah Rumah',
          image: Images.house
        }, {
          title: 'Kebersihan',
          image: Images.trash
        },
        {
          title: 'Kerusakan Jalan',
          image: Images.road,
          onPress: () => { this.props.navigation.navigate('PelaporanScreen') }
        },
        {
          title: 'Kelahiran & Kematian',
          image: Images.health
        }
      ]
    }
    this.renderItem = this.renderItem.bind(this)
  }

  renderItem = ({ item, index }) => {
    return <MainMenuItem {...item} />
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar />
        <FlatList
          numColumns={2}
          data={this.state.menu}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`} />
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportChooserScreen)
