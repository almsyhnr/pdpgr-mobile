import React, { Component } from 'react'
import {
  Text,
  InteractionManager,
  FlatList,
  View,
  Alert,
  Image,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import _ from 'lodash'
import ImagePicker from 'react-native-image-crop-picker'
import Modal from 'react-native-modalbox'
import { Button, ListItem } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'

// redux
import SubVillageActions from '../Redux/SubVillageRedux'
import SubmissionActions from '../Redux/SubmissionRedux'

// components
import { StatusBar } from '../Components/General'
import { InputBox } from '../Components/Form'

// Styles
import styles from './Styles/TambahPengajuanStyle'
import { Colors, Images } from '../Themes'
import ValidationComponent from '../Lib/validator'

class TambahPengajuan extends ValidationComponent {
  static navigationOptions = {
    title: 'Tambah Pengajuan',
    headerRight: <View />
  };

  constructor (props) {
    super(props)
    let _module = props.navigation.state.params.module
    this.state = {
      form: {
        module: _module.name,
        module_id: _module.id,
        type: _module.type_id,
        agen_id: props.user.id,
        identifier: '',
        group_name: '',
        pic_name: '',
        nik: '',
        phone: '',
        email: '',
        rt: '',
        rw: '',
        address: '',
        village: '',
        village_id: '',
        district: '',
        district_id: '',
        sub_village_id: '',
        sub_village: ''
      },
      images: [],
      modul: _module,
      subVillages: []
    }
  }

  componentWillMount () {
    InteractionManager.runAfterInteractions(() => {
      this.props.getSubVillages()
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.fetching && !nextProps.fetching) {
      this.setState({ subVillages: nextProps.subVillages })
    }

    if (this.props.posting && !nextProps.posting && !nextProps.error) {
      this.openMainDrawer()
    }
  }

  onValueChange = (field, value) => {
    const { form } = this.state
    let data = {}
    data[field] = value
    var formData = _.cloneDeep(form)
    formData = {
      ...formData,
      ...data
    }
    this.setState({ form: formData })
  };

  onSavePress = () => {
    this.validate({
      // identifier: { required: true },
      // group_name: { required: true },
      pic_name: { required: true },
      nik: { required: true },
      phone: { required: true },
      email: { required: true },
      rt: { required: true },
      rw: { required: true },
      sub_village: { required: true }
    })
    console.tron.error(this.state.form)
    console.tron.error(this.getErrorMessages())
    if (this.isFormValid()) {
      const { form, images } = this.state
      return this.props.createSubmission(form, images)
    }

    if (this.getErrorMessages().length > 0) {
      const messages = []

      if (this.state.modul.type === 'kelompok') {
        if (this.isFieldInError('identifier')) {
          messages.push('Field Identifier wajib diisi')
        }

        if (this.isFieldInError('group_name')) {
          messages.push('Nama kelompok wajib diisi')
        }
      }

      messages.push('Semua field wajib diisi')

      return Alert.alert('Error', messages[0])
    }
  };

  deleteImage = index => {
    let images = _.cloneDeep(this.state.images)
    images.splice(index, 1)
    this.setState({ images })
  };

  addImage = image => {
    console.tron.error(image)
    let images = _.cloneDeep(this.state.images)
    this.setState(
      {
        images: [...images, ...image]
      },
      () => {
        console.tron.error(this.state)
      }
    )
  };

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
      this.addImage([image])
    })
  };

  openGallery = () => {
    this.refs.modal_image.close()
    setTimeout(() => {
      ImagePicker.openPicker({
        cropping: false,
        multiple: true,
        maxFiles: 4,
        compressImageMaxWidth: 1024,
        compressImageMaxHeight: 1024
      }).then(images => {
        const data = _.map(images, image => {
          if (!image.filename) {
            image.filename = image.path
              .split('\\')
              .pop()
              .split('/')
              .pop()
          }
          return image
        })

        this.addImage(data)
      })
    }, 1000)
  };

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
  };

  selectPeliuk = peliuk => {
    let form = _.cloneDeep(this.state.form)
    form = {
      ...form,
      sub_village: peliuk.name,
      sub_village_id: peliuk.id,
      village: peliuk.village,
      village_id: peliuk.village_id,
      district: peliuk.district,
      district_id: peliuk.district_id
    }
    this.setState({ form })
    this.refs.modal_peliuk.close()
  };

  renderPeliuk = ({ item, index }) => {
    return (
      <ListItem
        title={item.full_name}
        topDivider
        onPress={() => this.selectPeliuk(item)}
      />
    )
  };

  filterPeliuk = keyword => {
    if (keyword.length === 0) {
      this.setState({ subVillages: this.props.subVillages })
    } else {
      let subVillages = _.cloneDeep(this.props.subVillages)
      subVillages = _.filter(subVillages, item => {
        if (_.includes(item.full_name, keyword)) {
          return item
        }
      })
      this.setState({ subVillages: subVillages })
    }
  };

  renderImageItem = ({ item, index }) => {
    return (
      <View style={{ width: '25%', marginBottom: 15 }}>
        <Touchable
          style={styles.delete}
          onPress={() => this.deleteImage(index)}
        >
          <Text style={styles.deleteText}>X</Text>
        </Touchable>
        <Image
          source={{ uri: item.path, isStatic: true }}
          style={styles.image}
          resizeMode={'cover'}
        />
      </View>
    )
  };

  render () {
    const { form, modul } = this.state
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView style={styles.container}>
          <StatusBar />
          <View style={styles.content}>
            <InputBox
              label='Jenis Pengajuan'
              value={form.module}
              editable={false}
            />
            {modul.type === 'kelompok' && (
              <InputBox
                label='Identifier'
                inputRef={c => { this.identifier_input = c }}
                onSubmitEditing={() => {
                  this.group_name_input.focus()
                }}
                value={form.identifier}
                placeholder='SIUP/TDP/NIK Penanggung Jawab'
                onChangeText={value => this.onValueChange('identifier', value)}
              />
            )}
            {modul.type === 'kelompok' && (
              <InputBox
                inputRef={c => { this.group_name_input = c }}
                onSubmitEditing={() => {
                  this.pic_name_input.focus()
                }}
                label='Nama Kelompok'
                value={form.group_name}
                placeholder='Wirausaha Muda Mandiri'
                onChangeText={value => this.onValueChange('group_name', value)}
              />
            )}
            <InputBox
              label='Nama Penerima Bantuan'
              placeholder='Steeve Jobs'
              inputRef={c => { this.pic_name_input = c }}
              onSubmitEditing={() => {
                this.nik_input.focus()
              }}
              onChangeText={value => this.onValueChange('pic_name', value)}
            />
            <InputBox
              inputRef={c => { this.nik_input = c }}
              onSubmitEditing={() => {
                this.phone_input.focus()
              }}
              label='NIK Penerima Bantuan'
              value={form.nik}

              placeholder='5204080099881112'
              onChangeText={value => this.onValueChange('nik', value)}
            />
            <InputBox
              inputRef={c => { this.phone_input = c }}
              onSubmitEditing={() => {
                this.email_input.focus()
              }}
              label='Telepon'
              value={form.phone}
              placeholder='087899098765'
              onChangeText={value => this.onValueChange('phone', value)}
            />
            <InputBox
              inputRef={c => { this.email_input = c }}
              onSubmitEditing={() => {
                this.address_input.focus()
              }}
              label='Email'
              value={form.email}
              keyboardType='email-address'
              placeholder='pdpgr@mail.com'
              onChangeText={value => this.onValueChange('email', value)}
            />
            <InputBox
              inputRef={c => { this.address_input = c }}
              onSubmitEditing={() => {
                this.rt_input.focus()
              }}
              label='Alamat'
              value={form.address}
              placeholder='Jalan pototano Gg. Teratai No.23'
              onChangeText={value => this.onValueChange('address', value)}
            />
            <View style={styles.horizontalForm}>
              <InputBox
                inputRef={c => { this.rt_input = c }}
                onSubmitEditing={() => {
                  this.rw_input.focus()
                }}
                label='RT'
                value={form.rt}
                placeholder='001'
                containerStyle={{ width: 100, marginRight: 40 }}
                onChangeText={value => this.onValueChange('rt', value)}
              />
              <InputBox
                inputRef={c => { this.rw_input = c }}
                onSubmitEditing={() => {
                  Keyboard.dismiss()
                  this.refs.modal_peliuk.open()
                }}
                label='RW'
                value={form.rw}
                placeholder='003'
                containerStyle={{ width: 100 }}
                onChangeText={value => this.onValueChange('rw', value)}
              />
            </View>
            <Touchable
              onPress={() => this.refs.modal_peliuk.open()}
              style={{ width: '100%', alignItems: 'center' }}
            >
              <InputBox
                label='Peliuk'
                placeholder='Pilih peliuk'
                editable={false}
                value={form.sub_village}
                onChangeText={value => this.onValueChange('sub_village', value)}
              />
            </Touchable>
            <InputBox
              label='Desa'
              value={form.village}
              editable={false}
              placeholder='Autocomplete'
            />
            <InputBox
              label='Kecamatan'
              value={form.district}
              editable={false}
              placeholder='Autocomplete'
            />
          </View>
          <FlatList
            data={this.state.images}
            renderItem={this.renderImageItem}
            numColumns={4}
            keyExtractor={(item, index) => `img-${index}`}
          />
          <Button
            title='Pilih File'
            buttonStyle={styles.btnPilihFile}
            disabled={this.props.posting}
            containerStyle={{ marginTop: 20 }}
            onPress={() => this.refs.modal_image.open()}
          />
          <View>
            <Button
              title='Simpan'
              disabled={this.props.posting}
              loading={this.props.posting}
              loadingStyle={{ padding: 10 }}
              buttonStyle={{ borderRadius: 0, backgroundColor: Colors.blue }}
              onPress={this.onSavePress}
            />
          </View>
        </KeyboardAwareScrollView>
        <Modal
          style={[styles.modalPeliuk]}
          ref={'modal_peliuk'}
          position='bottom'
          swipeToClose={false}
        >
          <View style={styles.modalContent}>
            <Button
              clear
              title='X'
              titleStyle={styles.closeModalText}
              containerStyle={styles.closeModal}
              onPress={() => this.refs.modal_peliuk.close()}
            />
            <View style={styles.modalSearch}>
              <InputBox
                placeholder='Kata kunci'
                onChangeText={this.filterPeliuk}
              />
            </View>
            <FlatList
              data={this.state.subVillages}
              keyExtractor={(item, index) => `${index}`}
              renderItem={this.renderPeliuk}
            />
          </View>
        </Modal>
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
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    subVillages: state.subVillage.subVillages,
    fetching: state.subVillage.fetching,
    error: state.submission.error,
    posting: state.submission.posting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSubVillages: () => dispatch(SubVillageActions.getSubVillages()),
    createSubmission: (form, files) =>
      dispatch(SubmissionActions.createSubmission(form, files))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TambahPengajuan)
