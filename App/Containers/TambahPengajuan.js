import React, { Component } from 'react'
import { Text, InteractionManager, FlatList, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import _ from 'lodash'
import Modal from 'react-native-modalbox'
import { Button, SearchBar, ListItem } from 'react-native-elements'

// redux
import SubVillageActions from '../Redux/SubVillageRedux'

// components
import { StatusBar } from '../Components/General'
import { InputBox } from '../Components/Form'

// Styles
import styles from './Styles/TambahPengajuanStyle'
import { Colors } from '../Themes'
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
      identifier: { required: true },
      group_name: { required: true },
      pic_name: { required: true },
      nik: { required: true },
      phone: { required: true },
      email: { required: true },
      rt: { required: true, numbers: true },
      rw: { required: true, numbers: true },
      sub_village: { required: true }
    })

    if (this.isFormValid()) {
      console.tron.error('save')
    }

    if (this.getErrorMessages().length) {
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

  selectPeliuk = (peliuk) => {
    let form = _.cloneDeep(this.state.form)
    form = {...form,
      sub_village: peliuk.name,
      sub_village_id: peliuk.id,
      village: peliuk.village,
      village_id: peliuk.village_id,
      district: peliuk.district,
      district_id: peliuk.district_id
    }
    this.setState({ form })
    this.refs.modal_peliuk.close()
  }

  renderPeliuk = ({ item, index }) => {
    return (
      <ListItem title={item.full_name} topDivider onPress={() => this.selectPeliuk(item)} />
    )
  }

  filterPeliuk = (keyword) => {
    if (keyword.length === 0) {
      this.setState({ subVillages: this.props.subVillages })
    } else {
      let subVillages = _.cloneDeep(this.props.subVillages)
      subVillages = _.filter(subVillages, (item) => {
        if (_.includes(item.full_name, keyword)) {
          return item
        }
      })
      this.setState({ subVillages: subVillages })
    }
  }

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
              value={form.identifier}
              placeholder='SIUP/TDP/NIK Penanggung Jawab'
              onChangeText={value => this.onValueChange('identifier', value)}
            />
          )}
            {modul.type === 'kelompok' && (
            <InputBox
              label='Nama Kelompok'
              value={form.group_name}
              placeholder='Wirausaha Muda Mandiri'
              onChangeText={value => this.onValueChange('group_name', value)}
            />
          )}
            <InputBox
              label='Nama Penerima Bantuan'
              value={form.pic_name}
              placeholder='Steeve Jobs'
              onChangeText={value => this.onValueChange('pic_name', value)}
          />
            <InputBox
              label='NIK Penerima Bantuan'
              value={form.nik}
              placeholder='5204080099881112'
              onChangeText={value => this.onValueChange('nik', value)}
          />
            <InputBox
              label='Telepon'
              value={form.phone}
              placeholder='087899098765'
              onChangeText={value => this.onValueChange('phone', value)}
          />
            <InputBox
              label='Email'
              value={form.email}
              placeholder='pdpgr@mail.com'
              onChangeText={value => this.onValueChange('email', value)}
          />
            <InputBox
              label='Alamat'
              value={form.address}
              placeholder='Jalan pototano Gg. Teratai No.23'
              onChangeText={value => this.onValueChange('address', value)}
          />
            <View style={styles.horizontalForm}>
              <InputBox
                label='RT'
                value={form.rt}
                placeholder='001'
                containerStyle={{ width: 100, marginRight: 40 }}
                onChangeText={value => this.onValueChange('rt', value)}
            />
              <InputBox
                label='RW'
                value={form.rw}
                placeholder='003'
                containerStyle={{ width: 100 }}
                onChangeText={value => this.onValueChange('rw', value)}
            />
            </View>

            <InputBox
              label='Peliuk'
              placeholder='Pilih peliuk'
              editable={false}
              value={form.sub_village}
              onTouchStart={() => this.refs.modal_peliuk.open()}
              onChangeText={value => this.onValueChange('sub_village', value)}
          />
            <InputBox label='Desa' value={form.village} editable={false} placeholder='Autocomplete' />
            <InputBox label='Kecamatan' value={form.district} editable={false} placeholder='Autocomplete' />
          </View>
          <View>
            <Button
              title='Simpan'
              buttonStyle={{ borderRadius: 0, backgroundColor: Colors.blue }}
              onPress={this.onSavePress}
          />
          </View>

        </KeyboardAwareScrollView>
        <Modal
          style={[styles.modalPeliuk]}
          ref={'modal_peliuk'}
          position='bottom'
          swipeToClose={false}>
          <View style={styles.modalContent}>
            <Button clear title='X' titleStyle={styles.closeModalText} containerStyle={styles.closeModal} onPress={() => this.refs.modal_peliuk.close()} />
            <View style={styles.modalSearch}>
              <InputBox placeholder='Kata kunci' onChangeText={this.filterPeliuk} />
            </View>
            <FlatList
              data={this.state.subVillages}
              keyExtractor={(item, index) => `${index}`}
              renderItem={this.renderPeliuk} />
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
    error: state.subVillage.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSubVillages: () => dispatch(SubVillageActions.getSubVillages())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TambahPengajuan)
