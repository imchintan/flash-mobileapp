import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const appStyles = require('./app');

const styles = StyleSheet.create({
    headerBackBtn:{
        paddingHorizontal: 15,
        paddingVertical: 8,
        flexDirection: 'row',
        position: 'absolute',
        left:0,
        top: Platform.OS === 'ios'?20:0,
    },
    aboutLogoBox: {
        paddingVertical:30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: width,
        backgroundColor: '#191714',
    },
    appLogo:{
        marginTop: Platform.OS === 'ios'?20:0,
        width: width/2.5,
        height: width/2.5,
        alignSelf: 'center',
    },
    versionText: {
        textAlign: 'center',
        fontFamily: 'futura-medium',
        marginTop: 20,
        fontSize: 24,
        color: '#E0AE27'
    },
    emailBox:{
        flexDirection: 'row',
        alignItems:'center',
        marginTop: 10,
    },
    envelopeIcon:{
        fontSize: 20,
        color: '#E0AE27',
        marginRight: 10,
    },
    emailText:{
        textAlign: 'center',
        fontFamily: 'futura-medium',
        fontSize: 24,
        color: '#E0AE27'
    },
    aboutInfoBox:{
        margin: 20,
    },
    aboutInfoText:{
        marginBottom: 20,
        textAlign: 'justify',
        fontSize: 15,
        color: '#787878'
    },
    aboutInfoTitleText:{
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '500',
        color: '#565656'
    },
    aboutInfoAdv:{
        flexDirection: 'row',
        marginTop: 7,
    },
    aboutInfoAdvIcon:{
        paddingHorizontal: 10,
        fontSize: 12,
        color: '#565656'
    },
    aboutInfoAdvText:{
        width: width - 75,
        textAlign: 'justify',
        fontSize: 14,
        color: '#787878'
    },
});

module.exports = {
    ...appStyles,
    ...styles
}
