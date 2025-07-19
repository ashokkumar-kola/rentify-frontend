import { StyleSheet, Dimensions } from 'react-native';

import { Colors, TextSizes, Fonts } from '../../constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    padding: 16,
    backgroundColor: Colors.blue50,
    borderRadius: 8,
    margin: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    justifyContent: 'center',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    flex: 1,
    paddingRight: 12,
    fontFamily: 'Poppins-Medium',
  },
  filterButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },

  main: {
    // flex: 1,
    // flexDirection: 'column',
    marginVertical: 16,
  },
  propertySection: {
    // paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    marginLeft:16,
    fontFamily: Fonts.Medium,
    fontSize: 18,
    // marginVertical: 10,
    color: Colors.black,
  },
});

export default styles;
