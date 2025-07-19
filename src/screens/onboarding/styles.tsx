import { StyleSheet, Dimensions } from 'react-native';

import { Colors, TextSizes, Spacing } from '../../constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },
  skipButton: {
    position: 'absolute',
    top: 32,
    right: 24,
    zIndex: 1,
  },
  skipText: {
    fontSize: TextSizes.md, // width * 0.04,
    color: Colors.grey600,
    // fontFamily: 'Poppins-medium',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48, // height * 0.1,
    paddingBottom: 24,
  },
  logo: {
    width: 180, // width * 0.4,
    height: 52,
    marginBottom: 32,
  },
  mainHeading: {
    fontSize: TextSizes['2xl'], // width * 0.07, // ~28 on std
    // fontFamily: 'Poppins-SemiBold',
    marginBottom: 24,
    textAlign: 'center',
    color: Colors.black200,
  },
  illustration: {
    width: '100%',
    height: height * 0.35,
    marginBottom: 16,
  },
  subHeading: {
    fontSize: width * 0.05,
    // fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.grey600,
    paddingHorizontal: 8,
  },
  paragraph: {
    fontSize: 12,// width * 0.04,
    // fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: Colors.grey500,
    lineHeight: 16,
    paddingHorizontal: 16,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 28,
    alignSelf: 'center',
    width: '60%',
    marginBottom: 40,
  },
  nextText: {
    color: Colors.white,
    fontSize: width * 0.045,
    // fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  searchBar: {
      width: '90%',
      height: 56,
      backgroundColor: Colors.white,
      margin: Spacing.base,
      borderRadius: 28,
      borderWidth: 2,
      borderColor: Colors.primary,
      paddingLeft:8,
      paddingRight: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 6 },
      // shadowOpacity: 0.15,
      // shadowRadius: 10,
      // elevation: 6,
  },
});

export default styles;
