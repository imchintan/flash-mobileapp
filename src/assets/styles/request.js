import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const appStyles = require('./app');
const walletStyles = require('./wallet');

const styles = StyleSheet.create({
    requestBox:{
        marginHorizontal: 20,
        marginBottom: 70,
    },
    requestRowLabel:{
        fontSize: 17,
        fontWeight: '500',
        color: '#191714',
        marginTop: 8,
    },
    requestRowNote:{
        alignSelf: 'flex-end',
        fontSize: 12,
        paddingTop: 2,
        paddingHorizontal: 5,
        color: '#9B9B9B'
    },
    requestRowInputBox:{
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 15,
        height: 44,
        borderWidth: 1.5,
        borderRadius:10,
        borderColor: '#191714'
    },
    requestRowInput:{
        fontSize: 16,
        color: '#333',
        width: '100%',
    },
    requestRowAmtLabelBox:{
        top:-0.5,
        width: 80,
        height: 42,
        marginLeft: 49,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#191714',
    },
    requestRowAmtLabel:{
        fontSize: 16,
        fontFamily: 'futura-medium',
        color: '#E0AE27',
        backgroundColor: '#191714'
    },
    requestRowClearBtn:{
        marginLeft: 10,
        backgroundColor: '#dedede'
    },
    requestRowClearBtnTxt:{
        color: '#000'
    },
    reqDetailModal:{
        backgroundColor: '#0007',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reqDetailBox:{
        width: '100%',
        paddingHorizontal: 20,
    },
    reqDetailBoxNote:{
        fontSize: 15,
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    reqDetailCloseIcon:{
        fontSize: 18,
        color: '#E0AE27',
        padding: 5,
        paddingRight: 0
    },
    reqDetailHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#191714',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    reqDetailTitle:{
        fontSize: 18,
        color: '#E0AE27',
    },
    reqDetailBody:{
        backgroundColor: '#FFFFFF',
        padding: 15,
        width: width - 40,
    },
    reqDetailRow:{
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    reqDetailIcon:{
        marginRight: 10,
        width: 50,
        height: 50,
        borderRadius: 25
    },
    reqAmtText:{
        fontSize: 30,
        fontWeight: '500',
        color: '#191714',
        alignSelf: 'center',
        paddingVertical: 5,
    },
    reqFiatAmtText:{
        fontSize: 25,
        color: '#191714',
        alignSelf: 'center',
        paddingBottom: 5,
    },
    reqDownArrow:{
        fontSize: 20,
        color: '#d55',
        alignSelf: 'center',
        paddingVertical: 5,
    },
    reqDetailText:{
        fontSize: 15,
        color: '#333333',
    },
    reqBtn:{
        backgroundColor: '#191714',
        width:'50%',
        borderRadius: 0,
        alignItems: 'center',
    },
    reqBtnLabel:{
        fontSize: 18,
        color: '#FFFFFF',
    },
    reqFeeText:{
        alignSelf: 'center',
        color: '#008fd0'
    },
    requestRowActionLinkTab:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
        marginBottom: -3,
    },
    requestRowActionLink:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#191714',
    },
    requestRowActionLinkIcon:{
        fontSize: 12,
        marginRight: 5,
        color:'#191714'
    },
    requestRowActionLinkLabel:{
        fontSize: 14,
        color:'#191714'
    },
    requestRowActionLinkDiv:{
        top: 2,
        marginHorizontal: 5,
        fontSize: 18,
        color:'#191714'
    },
    hr:{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#9F9F9F',
        marginBottom: 10,
    },
    qrCodeBox:{
        width:width-170,
        height:width-170,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrCodeBorder:{
        position: 'absolute',
        top:0,
        width:width-170,
        height:width-170,
        borderWidth: 7,
        borderColor: '#191714',
        backgroundColor: '#FFF'
    },
    walletAddress:{
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 10,
        height: 40,
        borderWidth: 1.5,
        borderRadius:10,
        borderColor: '#191714',
        backgroundColor: '#DFDFDF'
    },
    walletAddressText:{
        fontSize:15,
        fontWeight: '500',
        textAlign:'center'
    },
});

module.exports = {
    ...appStyles,
    ...walletStyles,
    ...styles
}
