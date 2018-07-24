import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
  modalTermin: {
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
  },
  modalImageContainer: {
    width: 220,
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalImageContent: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalImageItem: {
    padding: 7,
    alignItems: 'center'
  },
  modalImage: {
    width: 80,
    height: 80
  },
  modalImageText: {
    fontFamily: Fonts.type.base,
    color: Colors.darkPrimary
  },
  image: {
    width: 80,
    height: 60
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.primary,
    zIndex: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  deleteText: {
    color: Colors.snow
  },
  upload: { width: 60, height: 60, resizeMode: 'contain', marginBottom: 5 }
})
