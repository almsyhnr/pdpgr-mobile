import React from 'react'
import { View, Text, FlatList, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import Touchable from 'react-native-platform-touchable'
import Modal from 'react-native-modalbox'
import { Button, ListItem } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-crop-picker'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'

// redux
import SubmissionTransactionActions from '../../Redux/SubmissionTransactionRedux'

// components
import ValidationComponent from '../../Lib/validator'
import { InputBox } from '../../Components/Form'
import { StatusBar } from '../../Components/General'

// styles
import { Images, Colors } from '../../Themes'
import styles from './styles'

class TambahRealisasiScreen extends ValidationComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Tambah Transaksi'
    }
  };

  constructor (props) {
    super(props)
    this.state = {
      form: {
        termin: '',
        termin_id: null,
        submission_id: null,
        description: '',
        quantity: '',
        price: '',
        date: ''
      },
      images: [],
      termins: [],
      isDateTimePickerVisible: false
    }
  }

  componentDidMount () {
    console.tron.error(this.props)
    this.filterTermin()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.posting && !nextProps.posting && !nextProps.error) {
      nextProps.navigation.goBack()
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = dt => {
    console.tron.log(dt)
    let date = moment(dt).format('MM/DD/YYYY')
    this.onValueChange('date', date)
    this._hideDateTimePicker()
  };

  filterTermin = () => {
    let data = _.cloneDeep(this.props.termins)
    let termins = _.filter(data, item => {
      if (item.can_add) {
        return item
      }
    })
    this.setState({ termins })
  };

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

  selectTermin = item => {
    let form = _.cloneDeep(this.state.form)
    form = {
      ...form,
      termin: item.termin,
      termin_id: item.id,
      submission_id: item.submission_id
    }
    this.setState({ form })
    this.refs.modal_termin.close()
  };

  renderTermin = ({ item, index }) => {
    return (
      <ListItem
        title={item.termin}
        topDivider
        onPress={() => this.selectTermin(item)}
      />
    )
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

  onSavePress = () => {
    this.validate({
      termin: { required: true },
      date: { required: true },
      description: { required: true },
      quantity: { required: true },
      price: { required: true }
    })
    console.tron.error(this.state.form)
    console.tron.error(this.getErrorMessages())
    if (this.isFormValid()) {
      const { form, images } = this.state
      return this.props.createTransaction(form, images)
    }

    if (this.getErrorMessages().length > 0) {
      const messages = []

      messages.push('Semua field wajib diisi')

      return Alert.alert('Error', messages[0])
    }
  };

  render () {
    const { form } = this.state
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView style={styles.container}>
          <StatusBar />
          <View style={styles.content}>
            <Touchable
              onPress={() => this.refs.modal_termin.open()}
              style={{ width: '100%', alignItems: 'center' }}
            >
              <InputBox
                label='Termin'
                placeholder='Pilih termin'
                editable={false}
                value={form.termin}
                onChangeText={value => this.onValueChange('termin', value)}
              />
            </Touchable>
            <Touchable
              onPress={() => this._showDateTimePicker()}
              style={{ width: '100%', alignItems: 'center' }}
            >
              <InputBox
                label='Tanggal Transaksi'
                placeholder='12/30/2018'
                editable={false}
                value={form.date}
                onChangeText={value => this.onValueChange('date', value)}
              />
            </Touchable>
            <InputBox
              label='Deskripsi Transaksi'
              placeholder='Semen (Sak)'
              onSubmitEditing={() => {
                this.quantity_input.focus()
              }}
              onChangeText={value => this.onValueChange('description', value)}
            />
            <InputBox
              inputRef={c => this.quantity_input = c}
              label='Jumlah'
              placeholder='10'
              keyboardType='numeric'
              onSubmitEditing={() => {
                this.price_input.focus()
              }}
              onChangeText={value => this.onValueChange('quantity', value)}
            />
            <InputBox
              inputRef={c => this.price_input = c}
              label='Harga (Rp.)'
              placeholder='60000'
              keyboardType='numeric'
              onChangeText={value => this.onValueChange('price', value)}
            />
            {this.state.images.length > 0 ? (
              <FlatList
                data={this.state.images}
                renderItem={this.renderImageItem}
                numColumns={4}
                keyExtractor={(item, index) => `img-${index}`}
              />
            ) : (
              <View style={{ alignItems: 'center' }}>
                <Image source={Images.upload} style={styles.upload} />
                <Text>Pilih file sebagai bukti transaksi</Text>
              </View>
            )}

            <Button
              title='Pilih File'
              buttonStyle={styles.btnPilihFile}
              disabled={this.props.posting}
              containerStyle={{ marginTop: 20 }}
              onPress={() => this.refs.modal_image.open()}
            />
          </View>
          <View>
            <Button
              title='Simpan'
              disabled={this.props.posting}
              loading={this.props.posting}
              loadingStyle={{ padding: 10 }}
              buttonStyle={{ borderRadius: 0, backgroundColor: Colors.darkBlue }}
              onPress={this.onSavePress}
            />
          </View>
        </KeyboardAwareScrollView>
        <Modal
          style={[styles.modalTermin]}
          ref={'modal_termin'}
          position='bottom'
          swipeToClose={false}
        >
          <View style={styles.modalContent}>
            <Button
              clear
              title='X'
              titleStyle={styles.closeModalText}
              containerStyle={styles.closeModal}
              onPress={() => this.refs.modal_termin.close()}
            />
            <FlatList
              data={this.state.termins}
              keyExtractor={(item, index) => `${index}`}
              renderItem={this.renderTermin}
              style={{ marginTop: 40 }}
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
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    termins: state.submissionTermin.data,
    posting: state.submissionTransaction.posting,
    error: state.submissionTransaction.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTransaction: (form, images) => dispatch(SubmissionTransactionActions.createTransaction(form, images))

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TambahRealisasiScreen)
