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
import styles from './Styles/HomeScreenStyle'
import { Colors, Images } from '../Themes'

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Home',
      headerTitle: <HeaderTitle />,
      drawerIcon: ({focused}) => <Icon name='home' color={Colors.gray} />,
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
    this._backHandler = this._backHandler.bind(this)
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this._backHandler)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._backHandler)
  }

  _backHandler () {
    const { nav, navigation } = this.props
    if (nav.index === 0) {
      return false
    }
    navigation.dispatch(NavigationActions.back())
    return true
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
    nav: state.nav
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
