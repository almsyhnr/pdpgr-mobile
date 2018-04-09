import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      backgroundColor: Colors.snow,
      flex: 1
    },
    formContainer: {
      padding: 30
    },
    hitSlop: {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10
    }
  },
  text: {
    italicLink: {
      fontFamily: Fonts.type.emphasis,
      color: Colors.darkPrimary,
      fontSize: Fonts.size.medium
    }
  }
}

export default ApplicationStyles
