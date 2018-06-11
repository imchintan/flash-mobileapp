import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const appStyles = require('./app');
const requestStyles = require('./request');
const myAccountStyles = require('@styles/myAccount');
const styles = StyleSheet.create({
    profileRowLabel:{
        fontSize: 16,
        paddingHorizontal: 15,
        fontWeight: "500",
        color: '#C2C2C2'
    },
    profileRowInputBox:{
        justifyContent: 'center',
        marginTop: 5,
        width: '100%',
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1.5,
        borderRadius:25,
        borderColor: '#737373'
    },
    profileRowInput:{
        fontSize: 16,
        width: '100%',
        color: '#C2C2C2'
    },
    profileActionIcon:{
        fontSize: 16,
        paddingRight: 15,
        color: '#C2C2C2'
    },
    profileActionGreenIcon:{
        color: '#32CD32'
    },
    verifyPhoneDesc:{
        fontSize: 15,
        color: '#C2C2C2',
        marginBottom: 20,
    },
    verifyPhoneNote:{
        fontSize: 13,
        color: '#C2C2C2',
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
        borderColor: '#191714'
    },
    verifyPhoneInput:{
        paddingLeft: 15,
        fontSize: 16,
        width: 170,
        color: '#C2C2C2',
    },
    optionContainer: {
        borderRadius:5,
        width:width-30,
        height:400,
        backgroundColor:'rgba(60, 60, 60,0.85)',
        left:15,
    },
    cancelStyle: {
        borderRadius: 5,
        width: width-30,
        backgroundColor:'rgba(60, 60, 60,0.85)',
        padding: 10
    },
    canceTextStyle: {
        fontSize: 18,
        color: '#F3F3F3',
        textAlign: 'center'
    },
    optionTextStyle: {
        fontSize: 16,
        color: '#C2C2C2',
    },
    securityQueTextStyle: {
        fontSize: 20,
        color: '#C2C2C2',
    },
    optionStyle: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#565656'
    },
});

module.exports = {
    ...myAccountStyles,
    ...appStyles,
    ...requestStyles,
    ...styles
}
