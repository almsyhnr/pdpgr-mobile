import React, { Component } from 'react'
import { ScrollView, Image, View, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Touchable from 'react-native-platform-touchable'
import Modal from 'react-native-modalbox'
import ImagePicker from 'react-native-image-crop-picker'
import { Text, ListItem, Card, Icon } from 'react-native-elements'
// redux
import AuthActions from '../Redux/AuthRedux'
import UserActions from '../Redux/UserRedux'

// components
import { StatusBar } from '../Components/General'

// Styles
import styles from './Styles/ProfileScreenStyle'
import { Images } from '../Themes'

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Profile',
      title: 'Profile',
      drawerIcon: ({focused}) => <Image source={Images.ic_profil} style={styles.sidebarIcon} />
    }
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.props.getUser()
    })
  }

  openCamera = () => {
    this.refs.modal_image.close()
    ImagePicker.openCamera({
      cropping: true,
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024
    }).then(image => {
      if (!image.filename) {
        image.filename = image.path
          .split('\\')
          .pop()
          .split('/')
          .pop()
      }
      this.props.changeAvatar(image)
    })
  };

  openGallery = () => {
    this.refs.modal_image.close()
    setTimeout(() => {
      ImagePicker.openPicker({
        cropping: true,
        multiple: false,
        compressImageMaxWidth: 512,
        compressImageMaxHeight: 512
      }).then(image => {
        if (!image.filename) {
          image.filename = image.path
            .split('\\')
            .pop()
            .split('/')
            .pop()
        }

        this.props.changeAvatar(image)
      })
    }, 1000)
  };

  render () {
    const { user } = this.props
    if (!user) {
      return null
    }
    const rightIcon = (
      <Icon name='chevron-right' />
    )
    const logoutIcon = (
      <Icon name='power' type='feather' />
    )
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar />
        <View style={styles.avatarContainer}>
          <FastImage source={{ uri: user.avatar }} style={styles.avatar} />
          <Text h4>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <View style={styles.menuContainer}>
          <Card containerStyle={styles.card}>
            <ListItem title='Ubah Avatar' rightIcon={rightIcon} onPress={() => this.refs.modal_image.open()} />
          </Card>
          <Card containerStyle={styles.card}>
            <ListItem title='Ubah Password' rightIcon={rightIcon} onPress={() => this.props.navigation.navigate('UbahPasswordScreen')} />
          </Card>
          <Card containerStyle={styles.card}>
            <ListItem title='Ubah Profile' rightIcon={rightIcon} onPress={() => this.props.navigation.navigate('UpdateProfileScreen')} />
          </Card>
          <Card containerStyle={styles.card}>
            <ListItem title='Logout' rightIcon={logoutIcon} onPress={() => this.props.logout()} />
          </Card>
          <Modal
            ref='modal_image'
            position='center'
            style={styles.modalImageContainer}
            coverScreen
        >
            <View style={styles.modalImageContent}>
              <Touchable onPress={this.openCamera}>
                <View style={styles.modalImageItem}>
                  <Image source={Images.camera} style={styles.modalImage} />
                  <Text style={styles.modalImageText}>Camera</Text>
                </View>
              </Touchable>
              <Touchable onPress={this.openGallery}>
                <View style={styles.modalImageItem}>
                  <Image source={Images.gallery} style={styles.modalImage} />
                  <Text style={styles.modalImageText}>Gallery</Text>
                </View>
              </Touchable>
            </View>
          </Modal>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AuthActions.logout()),
    changeAvatar: (file) => dispatch(UserActions.changeAvatar(file)),
    getUser: () => dispatch(UserActions.getUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
