import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');

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
        color: '#FFFFFF',
        fontSize: 30,
        position: 'absolute',
        top: 10,
        right: 10
    },
    balanceText:{
        marginVertical: 8,
        color: '#E0AE27',
        fontSize: 40,
        fontWeight: 'bold',
        paddingLeft: 10,
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
        backgroundColor: '#fffd',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrCodeModalTitle:{
        marginBottom: 20,
        color: '#000080',
        fontSize: 20,
        fontWeight: '600',
    },
    qrCodeModalWalletAddress:{
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginTop: 20,
        width: width-60,
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
});

module.exports = {
    ...appStyles,
    ...styles
}
