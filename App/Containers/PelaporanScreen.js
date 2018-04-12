import React, { Component } from 'react'
import { Image, View, Text, FlatList, Alert } from 'react-native'
import { connect } from 'react-redux'
import Touchable from 'react-native-platform-touchable'
import ImagePicker from 'react-native-image-crop-picker'
import _ from 'lodash'
import { NavigationActions } from 'react-navigation'
import Modal from 'react-native-modal'

import { StatusBar } from '../Components/General'
import { NotificationButton } from '../Components/Button'
import { Input } from '../Components/Form'

// Styles
import { Images } from '../Themes'
import styles from './Styles/PelaporanScreenStyle'

class PelaporanScreen extends Component {
  static navigationOptions = {
    title: 'Laporan',
    headerRight: <NotificationButton />
  }

  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      images: [
        {}
      ]
    }
    this.renderItem = this.renderItem.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openMainDrawer = this.openMainDrawer.bind(this)
  }

  showModal = () => this.setState({ showModal: true })
  closeModal = () => this.setState({ showModal: false })

  renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <Touchable onPress={this.showModal} style={{ width: '25%', alignItems: 'center' }}>
          <Image source={Images.addPhoto} style={{ width: 60, height: 60 }} />
        </Touchable>
      )
    } else {
      // image thumbnails
      return (
        <View style={{width: '25%', marginBottom: 15}}>
          <Touchable style={styles.delete} onPress={() => this.deleteImage(index)}>
            <Text style={styles.deleteText}>X</Text>
          </Touchable>
          <Image
            source={{ uri: item.path, isStatic: true }}
            style={styles.image}
            resizeMode={'cover'}
          />
        </View>
      )
    }
  }

  deleteImage = (index) => {
    let images = _.cloneDeep(this.state.images)
    images.splice(index, 1)
    this.setState({images})
  }

  addImage = (image) => {
    console.tron.error(image)
    let images = _.cloneDeep(this.state.images)
    this.setState({images: [
      ...images,
      ...image
    ]}, () => {
      console.tron.error(this.state)
    })
  }

  openCamera = () => {
    this.setState({ showModal: false }, () => {
      ImagePicker.openCamera({
        cropping: true,
        compressImageMaxWidth: 1024,
        compressImageMaxHeight: 1024
      }).then(image => {
        if (!image.filename) {
          image.filename = image.path.split('\\').pop().split('/').pop()
        }
        this.addImage([image])
      })
    })
  }

  openGallery = () => {
    this.setState({
      showModal: false
    }, () => {
      setTimeout(() => {
        ImagePicker.openPicker({
          cropping: true,
          multiple: true,
          maxFiles: 10,
          compressImageMaxWidth: 1024,
          compressImageMaxHeight: 1024
        }).then(images => {
          const data = _.map(images, image => {
            if (!image.filename) {
              image.filename = image.path.split('\\').pop().split('/').pop()
            }
            return image
          })

          this.addImage(data)
        })
      }, 1000)
    })
  }

  openMainDrawer = () => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'MainDrawerScreen',
            params: {}
          })
        ]
      })
    )
  }

  render () {
    return (
      <View style={styles.container} >
        <StatusBar />
        <View style={{flex: 1, padding: 20}}>
          <Input
            placeholder='Deskripsi'
            containerStyle={{ height: 200, borderRadius: 10, marginBottom: 15 }}
            multiline />
          <Touchable style={styles.locationButton}>
            <View style={styles.locationButtonContainer}>
              <Image source={Images.markerButton} style={styles.iconButton} />
              <Text style={styles.textButton}>Lokasi</Text>
            </View>
          </Touchable>
          <FlatList
            data={this.state.images}
            renderItem={this.renderItem}
            numColumns={4}
            keyExtractor={(item, index) => `${index}`}
            contentContainerStyle={{flexGrow: 1}} />
        </View>

        <Touchable style={styles.submitContainer} onPress={this.openMainDrawer}>
          <Text style={styles.submitText}>Submit</Text>
        </Touchable>

        <Modal isVisible={this.state.showModal} onBackButtonPress={this.closeModal} onBackdropPress={this.closeModal}>
          <View style={styles.modalContainer}>
            <Touchable onPress={this.openCamera}>
              <View style={styles.modalItem}>
                <Image source={Images.camera} style={styles.modalImage} />
                <Text style={styles.modalText}>Camera</Text>
              </View>
            </Touchable>
            <Touchable onPress={this.openGallery}>
              <View style={styles.modalItem}>
                <Image source={Images.gallery} style={styles.modalImage} />
                <Text style={styles.modalText}>Gallery</Text>
              </View>
            </Touchable>
          </View>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(PelaporanScreen)
