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

export function formatMoney (n, separator = '.') {
  // Cast to string
  let num = (n + '')

  // Test for and get any decimals (the later operations won't support them)
  let decimals = ''
  if (/\./.test(num)) {
    // This regex grabs the decimal point as well as the decimal numbers
    decimals = num.replace(/^.*(\..*)$/, '$1')
  }

  // Remove decimals from the number string
  num = num.replace(decimals, '')
    // Reverse the number string through Array functions
    .split('').reverse().join('')
    // Split into groups of 1-3 characters (with optional supported character "-" for negative numbers)
    .match(/[0-9]{1,3}-?/g)
    // Add in the mille separator character and reverse back
    .join(separator).split('').reverse().join('')

  // Put the decimals back and output the formatted number
  return `${num}${decimals}`
}
