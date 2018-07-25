import React, { Component } from 'react'
import { ScrollView, View, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash'

// redux
import UserActions from '../Redux/UserRedux'

// components
import ValidationComponent from '../Lib/validator'
import { InputBox } from '../Components/Form'
import { StatusBar } from '../Components/General'

// Styles
import styles from './Styles/UbahPasswordScreenStyle'

class UbahPasswordScreen extends ValidationComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Ubah Password'
    }
  };

  constructor (props) {
    super(props)
    this.state = {
      form: {
        password: '',
        confirm_password: ''
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.posting && !nextProps.posting && !nextProps.error) {
      this.props.navigation.goBack()
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
      password: { required: true },
      confirm_password: { required: true }
    })
    let messages = []
    if (this.isFormValid()) {
      const { form } = this.state
      if (form.password !== form.confirm_password) {
        messages.push('Konfirmasi password salah')
        return Alert.alert('Error', messages[0])
      } else {
        return this.props.changePassword(form)
      }
    }

    if (this.getErrorMessages().length > 0) {
      messages.push('Semua field wajib diisi')

      return Alert.alert('Error', messages[0])
    }
  };

  render () {
    const { posting } = this.props
    return (
      <ScrollView style={styles.container}>
        <StatusBar />
        <View style={styles.content}>
          <InputBox
            secureTextEntry
            inputRef={c => this.quantity_input = c}
            label='Password Baru'
            onSubmitEditing={() => {
              this.confirm_input.focus()
            }}
            onChangeText={value => this.onValueChange('password', value)}
            />
          <InputBox
            secureTextEntry
            inputRef={c => this.confirm_input = c}
            label='Konfirmasi Password Baru'
            onChangeText={value => this.onValueChange('confirm_password', value)}
            />

        </View>
        <View style={{ padding: 15 }}>
          <Button title='Simpan' buttonStyle={styles.button} onPress={this.onSavePress} disabled={posting} loading={posting} />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posting: state.user.posting,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: form => dispatch(UserActions.changePassword(form))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UbahPasswordScreen)
