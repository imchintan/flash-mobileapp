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
    otherBalanceRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 300,
    },
    otherBalanceTab:{
        alignItems: 'center',
    },
    otherBalanceView:{
        borderBottomWidth: 1,
        borderBottomColor: '#FFDD4D',
        // width: 85,
        width: 125,
        alignItems: 'center'
    },
    otherBalanceAmtText:{
        color: '#FFFFFF',
        // fontSize: 13,
        fontSize: 15,
    },
    otherBalanceText:{
        color: '#FFFFFF',
        // fontSize: 15,
        fontSize: 17,
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
    userProfileImage:{
        width:34,
        height:34,
        borderRadius: 17
    },
    currencyMenuTab:{
        alignItems: 'center',
        flexDirection: 'row',
        padding: 7,
        borderRadius: 5,
        backgroundColor: 'rgba(155,155,155,0.5)'
    },
    currencyMenuTabIcon:{
        width:24,
        height:24,
        borderRadius: 12
    },
    currencyMenuTabArrow:{
        color: '#FFFFFF',
        fontSize: 17,
        paddingLeft: 5
    },
    currencyMenuPopup:{
        position: 'absolute',
        right: 5,
        top: 38,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.5)',
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.7,
                top: 60,
            },
            android: {
                elevation: 12,
                top: 38,
            },
        }),
        zIndex: 100000
    },
    currencyMenuPopupContainer:{
        width,
        height
    },
    currencyMenuPopupBox:{
        position: 'absolute',
        right: 0,
        top: 10,
        backgroundColor: '#989898',
        width: 125,
        borderRadius: 5,
    },
    currencyMenuPopupUpArrow:{
        position: 'absolute',
        right: 8,
        top: -12,
        color: '#989898',
        fontSize: 32
    },
    currencyMenuPopupTab:{
        padding: 5,
        marginHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#777',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    currencyMenuPopupTabIcon:{
        width:25,
        height:25,
        borderRadius: 12.5
    },
    currencyMenuPopupTabIconF:{
        width:26,
        height:26,
        borderRadius: 13
    },
    currencyMenuPopupTabLabel:{
        paddingLeft: 6,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
});

module.exports = {
    ...appStyles,
    ...reqStyles,
    ...styles
}
