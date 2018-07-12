import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  content: {
    alignItems: 'center',
    paddingVertical: 15
  },
  horizontalForm: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: '5%'
  },
  modalPeliuk: {
    height: '60%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  modalContent: {
    flex: 1
  },
  modalSearch: {width: '95%', marginLeft: 10, marginTop: 15},
  closeModal: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  closeModalText: {
    fontSize: 16,
    color: Colors.darkPrimary
  }
})
