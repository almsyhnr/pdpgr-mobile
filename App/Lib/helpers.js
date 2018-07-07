import { Linking } from 'react-native'

export function openUrl (url) {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.tron.log('Can\'t handle url: ' + url)
    } else {
      return Linking.openURL(url)
    }
  }).catch(err => console.tron.error('An error occurred', err))
}
