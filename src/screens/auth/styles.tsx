import { StyleSheet, Dimensions } from 'react-native';

import { Colors, TextSizes, Spacing } from '../../constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
      wrapper: {
    flex: 1,
    // padding: Spacing.lg,
    justifyContent: 'center',
  },
    logoContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    backButton: {
        color: Colors.primary,
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    logo: {
        width: 180,
        height: 52,
        marginTop: 16,
    },
    tagline: {
        fontSize: TextSizes.md,
        color: Colors.primary,
        // marginTop: 0,
        letterSpacing: 3,
        fontFamily: 'Poppins-SemiBold',
    },
    card: {
        backgroundColor: Colors.primary,
        marginTop: 32,
        padding: 24,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
        flex: 1,
        position: 'relative',
    },
    welcome: {
        fontSize: TextSizes['2xl'],
        color: Colors.white100,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
    subText: {
        color: Colors.white100,
        fontSize: TextSizes.md,
        marginTop: 8,
        marginBottom: 24,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    inputContainer: {
        backgroundColor: Colors.white100,
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        color: '#222',
        fontSize: TextSizes.sm,
        fontFamily: 'Poppins-Regular',
    },
      errorContainer: {
        width: 200,
        flexDirection: 'row',
        // borderWidth: 1,
        // borderBlockColor: 'black',
        paddingHorizontal: 8,
        paddingTop: 4,
        paddingBottom: 8,
    },
    error: {
        flex: 0,
        borderWidth: 1,
        borderBlockColor: 'black',
    },
    errorText: {
        color: '#fff',
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 8,
        fontFamily: 'Poppins-Regular',
    },
    forgotContainer: {
        alignSelf: 'flex-end',
        marginBottom: 16 ,
    },
    forgotText: {
        color: Colors.white100,
        fontSize: TextSizes.md,
        fontFamily: 'Poppins-Regular',
    },
    // signInUpButton: {
    //     width: 220,
    //     backgroundColor: Colors.white100,
    //     paddingVertical: 12,
    //     borderRadius: 26,
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     marginBottom: 16,
    // },
    // signInUpText: {
    //     color: Colors.primary,
    //     fontWeight: 'bold',
    //     fontSize: TextSizes.base,
    // },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.grey200,
    },
    or: {
        marginHorizontal: 16,
        color: Colors.white100,
        fontWeight: 'bold',
    },
    googleButton: {
        backgroundColor: '#34A853',
        borderRadius: 8,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
    },
    googleText: {
        color: Colors.white100,
        fontSize: TextSizes.base,
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
    },
    signContainer: {
        // flex: 1,
        // alignItems: 'row',
        // flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        // top: 0,
        // left: 0,
        bottom: 40,
        left: '50%',
        transform: [{ translateX: -120 }], // Center the container
        gap: Spacing.sm,
    },
    signTextContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signText: {
        color: Colors.white100,
        fontSize: TextSizes.md,
        fontFamily: 'Poppins-Regular',
    },
    signLink: {
        color: Colors.white100,
        fontFamily: 'Poppins-SemiBold',
        // fontWeight: 'bold',
        // textDecorationLine: 'underline',
    },
    // errorText: {
    //     color: Colors.error,
    //     fontSize: 12,
    //     marginTop: -10,
    //     marginBottom: 10,
    //     marginLeft: 40,
    // },
});

export default styles;
