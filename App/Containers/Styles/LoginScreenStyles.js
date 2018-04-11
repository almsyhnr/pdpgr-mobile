import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.text,
  footerImage: {
    height: 270,
    position: 'absolute',
    bottom: 10,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  logo: { height: 100, resizeMode: 'contain', alignSelf: 'center', marginTop: 30 },
  button: {
    backgroundColor: Colors.darkPrimary,
    padding: 10,
    borderRadius: 50,
    marginTop: 10
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: 15,
    marginRight: 20
  },
  input: {
    fontFamily: Fonts.type.emphasis,
    textAlign: 'center'
  }
})
