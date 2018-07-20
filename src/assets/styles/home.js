import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { getAdjustedSize } from './utils';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');
const reqStyles = require('./request');

const styles = StyleSheet.create({
    headerTextLogo:{
        resizeMode: 'contain',
        height: getAdjustedSize(40),
        width: getAdjustedSize(272*40/100),
    },
    headerBalanceBox:{
        width: width/2,
        alignItems: 'flex-end',
    },
    headerBalance:{
        color: '#EDEDED',
        fontSize: getAdjustedSize(24),
        fontWeight: '500',
        marginTop: -7
    },
    headerBalanceLabel:{
        color: '#BDBDBD',
        fontSize: getAdjustedSize(16),
    },
    label:{
        fontSize: getAdjustedSize(18),
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
        height: getAdjustedSize(65),
        borderRadius: 5,
        backgroundColor: '#111111',
        marginBottom: 10,
    },
    walletIcon:{
        width: getAdjustedSize(50),
        height: getAdjustedSize(50),
    },
    walletTabDetail:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - getAdjustedSize(120),
    },
    currencyLabel:{
        color:'#FFFFFF',
        fontFamily: 'futura-medium',
        fontSize: getAdjustedSize(20),
    },
    walletConversionRate:{
        color:'rgba(255,255,255,0.8)',
        fontSize: getAdjustedSize(13),
    },
    walletBalanceDetail:{
        alignItems: 'flex-end',
    },
    walletBalanceInFiatCurrency:{
        color:'#FFFFFF',
        fontWeight: '500',
        fontSize: getAdjustedSize(18),
    },
    walletBalance:{
        color:'#FFFFFF',
        fontSize: getAdjustedSize(13),
    },
    adminTab:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        height: getAdjustedSize(45),
        borderRadius: 5,
        backgroundColor: '#E0AE27',
        marginBottom: 10,
    },
    adminTabTitle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    adminTabTitleIcon:{
        width: getAdjustedSize(26),
        textAlign: 'center',
        fontSize: getAdjustedSize(24),
        color: '#333333',
        marginRight: 8,
    },
    adminTabTitleLabel:{
        fontSize: getAdjustedSize(17),
        color: '#333333',
        fontFamily: 'futura-medium',
    },
    adminTabSubTitleLabel:{
        fontSize: getAdjustedSize(15),
        color: '#111111',
        fontFamily: 'futura-medium',
        marginRight:5
    },
    adminTabRightIcon:{
        ...Platform.select({
            ios: {
                height: 40,
                bottom: 1
            },
        }),
        fontSize: getAdjustedSize(40),
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
        fontSize: getAdjustedSize(18),
        color: '#4A4A4A',
        textAlign: 'center'
    },
    fiatCurrencyName: {
        fontSize: getAdjustedSize(16),
        color: '#4A4A4A'
    },
    fiatCurrencyUnit: {
        fontSize: getAdjustedSize(16),
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
