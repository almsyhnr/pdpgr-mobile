import React, { Component } from 'react'
import { ScrollView, Text, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import _ from 'lodash'

// Styles
import styles from './Styles/TambahPengajuanStyle'
import { InputBox } from '../Components/Form'
import { Button } from 'react-native-elements'
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
      modul: _module
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

  render () {
    const { form, modul } = this.state
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.content}>
          <InputBox
            label='Jenis Pengajuan'
            value={form.module}
            editable={false}
          />
          {modul.type === 'kelompok' && (
            <InputBox
              label='Identifier'
              onChangeText={value => this.onValueChange('identifier', value)}
            />
          )}
          {modul.type === 'kelompok' && (
            <InputBox
              label='Nama Kelompok'
              onChangeText={value => this.onValueChange('group_name', value)}
            />
          )}
          <InputBox
            label='Nama Penerima Bantuan'
            onChangeText={value => this.onValueChange('pic_name', value)}
          />
          <InputBox
            label='NIK Penerima Bantuan'
            onChangeText={value => this.onValueChange('nik', value)}
          />
          <InputBox
            label='Telepon'
            onChangeText={value => this.onValueChange('phone', value)}
          />
          <InputBox
            label='Email'
            onChangeText={value => this.onValueChange('email', value)}
          />
          <InputBox
            label='Alamat'
            onChangeText={value => this.onValueChange('address', value)}
          />
          <View style={styles.horizontalForm}>
            <InputBox
              label='RT'
              containerStyle={{ width: 100, marginRight: 40 }}
              onChangeText={value => this.onValueChange('rt', value)}
            />
            <InputBox
              label='RW'
              containerStyle={{ width: 100 }}
              onChangeText={value => this.onValueChange('rw', value)}
            />
          </View>

          <InputBox
            label='Peliuk'
            onChangeText={value => this.onValueChange('sub_village', value)}
          />
          <InputBox label='Desa' editable={false} />
          <InputBox label='Kecamatan' editable={false} />
        </View>
        <View>
          <Button
            title='Simpan'
            buttonStyle={{ borderRadius: 0, backgroundColor: Colors.blue }}
            onPress={this.onSavePress}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TambahPengajuan)
