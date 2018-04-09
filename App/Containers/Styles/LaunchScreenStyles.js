import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  footerImage: {
    height: 250,
    position: 'absolute',
    bottom: 10,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})
