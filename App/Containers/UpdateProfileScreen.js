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
import styles from './Styles/UpdateProfileScreenStyle'

class UpdateProfileScreen extends ValidationComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Update Profile'
    }
  };

  constructor (props) {
    super(props)
    console.tron.error(props)
    this.state = {
      form: {
        name: props.user.name,
        email: props.user.email
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
      name: { required: true },
      email: { required: true, email: true }
    })
    let messages = []
    if (this.isFormValid()) {
      const { form } = this.state
      return this.props.updateProfile(form)
    }

    if (this.getErrorMessages().length > 0) {
      messages.push('Semua field wajib diisi')

      return Alert.alert('Error', messages[0])
    }
  };

  render () {
    const { posting } = this.props
    const { form } = this.state
    return (
      <ScrollView style={styles.container}>
        <StatusBar />
        <View style={styles.content}>
          <InputBox
            label='Nama'
            value={form.name}
            onSubmitEditing={() => {
              this.email_input.focus()
            }}
            onChangeText={value => this.onValueChange('name', value)}
            />
          <InputBox
            keyboardType='email-address'
            inputRef={c => this.email_input = c}
            label='Email'
            value={form.email}
            onChangeText={value => this.onValueChange('email', value)}
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
    user: state.user.data,
    posting: state.user.posting,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: form => dispatch(UserActions.updateProfile(form))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen)
