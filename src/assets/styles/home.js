import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');
const reqStyles = require('./request');

const styles = StyleSheet.create({
    headerTextLogo:{
        resizeMode: 'contain',
        height: 40,
        width: 273*40/100,
        ...Platform.select({
            ios: {
                marginTop: 7,
            },
            android: {
            },
        }),
    },
    headerBalanceBox:{
        width: width/2,
        alignItems: 'flex-end',
    },
    headerBalance:{
        color: '#EDEDED',
        fontSize: 24,
        fontWeight: '500',
        marginTop: -7
    },
    headerBalanceLabel:{
        color: '#BDBDBD',
        fontSize: 16,
    },
    label:{
        fontSize: 18,
        color: '#4A4A4A',
        marginTop: 15,
    },
    hr:{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#9F9F9F',
        marginBottom: 15,
    },
    walletTab:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        height: 65,
        borderRadius: 5,
        backgroundColor: '#111111',
        marginBottom: 10,
    },
    walletIcon:{
        width: 50,
        height: 50,
    },
    walletTabDetail:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - 120,
    },
    currencyLabel:{
        color:'#FFFFFF',
        fontFamily: 'futura-medium',
        fontSize: 20,
    },
    walletConversionRate:{
        color:'rgba(255,255,255,0.8)',
        fontSize: 14,
    },
    walletBalanceDetail:{
        alignItems: 'flex-end',
    },
    walletBalanceInFiatCurrency:{
        color:'#FFFFFF',
        fontWeight: '500',
        fontSize: 18,
    },
    walletBalance:{
        color:'#FFFFFF',
        fontSize: 14,
    },
    adminTab:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        height: 45,
        borderRadius: 5,
        backgroundColor: '#E0AE27',
        marginBottom: 10,
    },
    adminTabTitle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    adminTabTitleIcon:{
        width: 25,
        textAlign: 'center',
        fontSize: 24,
        color: '#333333',
        marginRight: 8,
    },
    adminTabTitleLabel:{
        fontSize: 17,
        color: '#333333',
        fontFamily: 'futura-medium',
    },
    adminTabSubTitleLabel:{
        fontSize: 15,
        color: '#111111',
        fontFamily: 'futura-medium',
        marginRight:5
    },
    adminTabRightIcon:{
        fontSize: 40,
        color: '#a37d17',
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
    fiatCurrencyName: {
        fontSize: 16,
        color: '#4A4A4A'
    },
    fiatCurrencyUnit: {
        fontSize: 16,
        color: '#4A4A4A'
    },
    optionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#B1B1B1'
    },
});

module.exports = {
    ...appStyles,
    ...reqStyles,
    ...styles
}
