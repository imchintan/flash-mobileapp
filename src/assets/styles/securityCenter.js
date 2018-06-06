import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const appStyles = require('./app');

const styles = StyleSheet.create({
    securityCenterBox: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: width,
        backgroundColor: '#191714',
    },
    securityCenterBoxIcon: {
        fontSize: 100,
        color: '#E0AE27'
    },
    securityCenterBoxNote: {
        textAlign: 'center',
        fontFamily: 'futura-medium',
        marginTop: 10,
        fontSize: 18,
        color: '#E0AE27'
    },
    securityCenterTab:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 100,
        backgroundColor: '#EDEDEDED',
        borderBottomWidth: 0.5,
        marginBottom: 1,
        borderBottomColor: '#787878',
    },
    securityCenterTabLeftIcon:{
        fontSize: 30,
        color: '#787878'
    },
    securityCenterTabContent:{
        paddingHorizontal: 15,
        width: width - 75,
    },
    securityCenterTabTitle:{
        fontSize: 20,
        fontFamily: 'futura-medium',
        color: '#191714'
    },
    securityCenterTabNote:{
        fontSize: 15,
        color: '#191714'
    },
    securityCenterTabRightIcon:{
        fontSize: 40,
        color: '#9b9b9b'
    },
    fingerprint:{
        height: 100,
        width: 100,
        resizeMode: 'contain',
        marginVertical: 10
    },
    fingerprintNote:{
        padding: 20,
        fontSize: 16,
        color: '#333333'
    },
    fingerprintSwitch:{
        alignItems: 'center',
    },
    fingerprintSwitchLabel:{
        fontSize: 17,
        fontFamily: 'futura-medium',
        color: '#000000',
        marginBottom: 10,
    },
    twoPhaseAuth:{
        margin: 20,
    },
    twoPhaseAuthSwitch:{
        marginTop: 20,
        alignItems: 'center',
    },
    twoPhaseAuthSwitchLabel:{
        fontSize: 17,
        fontFamily: 'futura-medium',
        color: '#000000',
        marginBottom: 10,
    },
    twoPhaseAuthTitle:{
        marginTop: 10,
        marginBottom: 5,
        fontSize: 22,
        fontFamily: 'futura-medium',
        color: '#111'
    },
    twoPhaseAuthNote:{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 5,
    },
    twoPhaseAuthNoteBold:{
        fontFamily: 'futura-medium',
        color: '#000000'
    },
    twoPhaseAuthNoteText:{
        marginRight: 5,
        fontSize: 14,
        color: '#5A5A5A'
    },
    twoPhaseAuthQR:{
        justifyContent: 'center',
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 15,
    },
    twoPhaseAuthInputBox:{
        justifyContent: 'center',
        marginTop: 5,
        width: '100%',
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1.5,
        borderRadius:25,
        borderColor: '#ddd'
    },
    twoPhaseAuthInput:{
        fontSize: 16,
        width: '100%',
        color: '#333'
    },
});

module.exports = {
    ...appStyles,
    ...styles
}
