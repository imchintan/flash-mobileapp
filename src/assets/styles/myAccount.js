import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');
const requestStyles = require('./request');

const styles = StyleSheet.create({
    profile:{
        margin: 20,
    },
    profileRow:{
        marginBottom: 15,
    },
    profileRowTitle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileActionIcon:{
        fontSize: 16,
        paddingRight: 15,
    },
    profileActionBtnGrp:{
        flexDirection: 'row',
    },
    profileRowLabel:{
        fontSize: 16,
        paddingHorizontal: 15,
        fontWeight: "500",
        color: '#4A4A4A'
    },
    profileRowInputBox:{
        justifyContent: 'center',
        marginTop: 5,
        width: '100%',
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1.5,
        borderRadius:25,
        borderColor: '#ddd'
    },
    profileRowQRBox:{
        justifyContent: 'center',
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 15,
    },
    profileRowInput:{
        fontSize: 16,
        width: '100%',
        color: '#333'
    },
    profileSettingRow:{
        marginBottom: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileSettingLabel:{
        fontSize: 16,
        color: '#4A4A4A'
    },
    profileSettingValue:{
        fontSize: 18,
        fontWeight: "500",
        color: '#333'
    },
    setting2faTitle:{
        marginTop: 10,
        marginBottom: 5,
        fontSize: 22,
        fontWeight: "500",
        color: '#333'
    },
    setting2faNote:{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 5,
    },
    setting2faNoteBold:{
        fontWeight: "500",
        color: '#333'
    },
    setting2faNoteText:{
        fontSize: 14,
        color: '#4A4A4A'
    },
    flagBoxStyle:{
        backgroundColor: '#E0AE27',
        height: 50,
        borderTopLeftRadius:25,
        borderBottomLeftRadius:25,
    },
    overlayStyle: {
        justifyContent: 'center',
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    optionContainer: {
        borderRadius:5,
        width:width-30,
        height:400,
        backgroundColor:'rgba(255,255,255,0.8)',
        left:15,
    },
    cancelContainer: {
        left:15,
        top: 10
    },
    cancelStyle: {
        borderRadius: 5,
        width: width-30,
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: 10
    },
    canceTextStyle: {
        fontSize: 18,
        color: '#4A4A4A',
        textAlign: 'center'
    },
    optionTextStyle: {
        fontSize: 16,
        color: '#4A4A4A'
    },
    securityQueTextStyle: {
        fontSize: 20,
        color: '#4A4A4A'
    },
    optionStyle: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    verifyPhoneDesc:{
        fontSize: 15,
        color: '#333',
        marginBottom: 20,
    },
    verifyPhoneNote:{
        fontSize: 13,
        color: '#333',
        marginTop: 20,
    },
    verifyPhoneInputBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        width: '100%',
        height: 50,
        borderWidth: 1.5,
        borderRadius:25,
        borderColor: '#ddd'
    },
    verifyPhoneInput:{
        paddingLeft: 15,
        fontSize: 16,
        width: 170,
        color: '#333',
    },
    verifyPhoneBtn:{
        backgroundColor: '#191714',
        width:120,
        paddingHorizontal: 0,
        paddingVertical: 13,
        borderRadius: 0,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        alignItems: 'center',
    },
    verifyPhoneResend:{
        fontSize: 15,
        fontWeight: '500',
        color: '#E0AE27'
    },
    verifyPhoneError:{
        fontSize: 15,
        color: 'red',
        marginTop: 5
    }
});

module.exports = {
    ...appStyles,
    ...requestStyles,
    ...styles
}
