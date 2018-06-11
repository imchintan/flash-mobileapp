import {
    StyleSheet
} from 'react-native';

const appStyles = require('./app');
const securityCenterStyles = require('@styles/securityCenter');
const styles = StyleSheet.create({

    securityCenterTab:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 100,
        backgroundColor: '#393939',
        borderBottomWidth: 0.5,
        marginBottom: 1,
        borderBottomColor: '#737373',
    },
    securityCenterTabRightIcon:{
        fontSize: 40,
        color: '#737373'
    },
    securityCenterTabTitle:{
        fontSize: 20,
        fontFamily: 'futura-medium',
        color: '#E9E9E9'
    },
    securityCenterTabNote:{
        fontSize: 15,
        color: '#C2C2C2'
    },
    securityCenterTabEnable:{
        color: '#32CD32'
    },
    twoPhaseAuthSwitchLabel:{
        fontSize: 17,
        fontFamily: 'futura-medium',
        color: '#E9E9E9',
        marginBottom: 10,
    },
    twoPhaseAuthTitle:{
        marginTop: 10,
        marginBottom: 5,
        fontSize: 22,
        fontFamily: 'futura-medium',
        color: '#E9E9E9'
    },
    twoPhaseAuthNoteBold:{
        fontFamily: 'futura-medium',
        color: '#E9E9E9'
    },
    twoPhaseAuthNoteText:{
        marginRight: 5,
        fontSize: 14,
        color: '#B8B8B8'
    },
    twoPhaseAuthInputBox:{
        justifyContent: 'center',
        marginTop: 5,
        width: '100%',
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1.5,
        borderRadius:25,
        borderColor: '#7d7d7d'
    },
    twoPhaseAuthInput:{
        fontSize: 16,
        width: '100%',
        color: '#E9E9E9'
    },
    fingerprintNote:{
        padding: 20,
        fontSize: 16,
        color: '#A4A4A4'
    },
    fingerprintSwitchLabel:{
        fontSize: 17,
        fontFamily: 'futura-medium',
        color: '#E9E9E9',
        marginBottom: 10,
    },
});

module.exports = {
    ...securityCenterStyles,
    ...appStyles,
    ...styles
}
