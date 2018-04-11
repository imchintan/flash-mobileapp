import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');
const reqStyles = require('./request');

const styles = StyleSheet.create({
    balanceBox:{
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingVertical: 20,
        marginTop: 2,
    },
    balanceLabel:{
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '400',
    },
    balanceRefresh:{
        padding: 5,
        position: 'absolute',
        top: 10,
        right: 10
    },
    balanceRefreshIcon:{
        color: '#FFFFFF',
        fontSize: 30,
    },
    balanceText:{
        marginVertical: 8,
        textAlign: 'center',
        color: '#E0AE27',
        fontSize: 40,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    otherBalanceText:{
        color: '#FFFFFF',
        fontSize: 18,
    },
    recentTxnLabel: {
        marginHorizontal: 20,
        marginVertical: 10,
        color: '#000000',
        fontSize: 22,
    },
    qrCodeModal:{
        backgroundColor: '#191714',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrCodeModalTitle:{
        marginBottom: 20,
        color: '#E0AE27',
        fontSize: 24,
    },
    qrCodeModalWalletAddress:{
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginTop: 20,
        width: height < 750?width-60: 500,
        height: 50,
        borderWidth: 1.5,
        borderRadius:25,
        borderColor: '#ddd'
    },
    qrCodeModalWalletAddressText:{
        fontSize:14,
        fontWeight: '500',
        textAlign:'center'
    },
    qrCodeModalBtnGrp:{
        marginTop: 20,
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-between',
    },
    qrCodeModalBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        borderColor:'#FFFFFF',
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
    },
    qrCodeModalBtnIcon:{
        fontSize: 20,
        color: '#FFFFFF',
        marginRight: 10,
    },
    qrCodeModalBtnText:{
        fontSize: 16,
        color: '#FFFFFF'
    },
    qrCodeModalCloseBtn:{
        borderRadius:25,
        marginTop: 20
    },
    txnList: {
        flex: 1,
        minHeight: 200,
    },
    txnListEmpty: {
        marginTop: 70,
        fontSize: 18,
        padding: 20,
        textAlign: 'center'
    },
    sendReceiveBtnGrp:{
        marginTop: 15,
        flexDirection: 'row',
        width: 280,
        justifyContent: 'space-between',
    },
    sendReceiveBtn:{
        width: 135,
        alignItems: 'center',
    },
});

module.exports = {
    ...appStyles,
    ...reqStyles,
    ...styles
}
