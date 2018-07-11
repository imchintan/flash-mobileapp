import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const appStyles = require('./app');
const walletStyles = require('./wallet');
const requestStyles = require('@styles/request');
const styles = StyleSheet.create({
    reqDetailModal:{
        backgroundColor: '#000B',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reqDetailBody:{
        backgroundColor: '#313131',
        padding: 15,
        width: width - 40,
    },
    reqDetailBoxNote:{
        fontSize: 15,
        color: '#A4A4A4',
        textAlign: 'center',
        marginBottom: 15,
    },
    requestRowInputBox:{
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 15,
        height: 44,
        borderWidth: 1.5,
        borderRadius:10,
        borderColor: '#7D7D7D'
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
        backgroundColor: '#606060',
    },
    requestRowAmtLabel:{
        fontSize: 16,
        fontFamily: 'futura-medium',
        color: '#E0AE27',
        backgroundColor: '#606060'
    },
    requestRowInput:{
        fontSize: 16,
        color: '#C2C2C2',
        width: '100%',
    },
    requestRowLabel:{
        fontSize: 17,
        fontWeight: '500',
        color: '#C2C2C2',
        marginTop: 8,
    },
    requestRowNote:{
        alignSelf: 'flex-end',
        fontSize: 12,
        paddingTop: 2,
        paddingHorizontal: 5,
        color: '#A4A4A4'
    },
    requestRowActionLink:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
    },
    requestRowActionLinkIcon:{
        fontSize: 12,
        marginRight: 5,
        color:'#F3F3F3'
    },
    requestRowActionLinkLabel:{
        fontSize: 14,
        color:'#F3F3F3'
    },
    requestRowActionLinkDiv:{
        top: 2,
        marginHorizontal: 5,
        fontSize: 18,
        color:'#F3F3F3'
    },
    qrCodeBorder:{
        position: 'absolute',
        top:0,
        width:width-170,
        height:width-170,
        borderWidth: 7,
        borderColor: '#FFFFFF',
    },
    walletAddress:{
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 10,
        height: 40,
        borderWidth: 1.5,
        borderRadius:10,
        borderColor: '#7D7D7D',
        backgroundColor: '#606060'
    },
    walletAddressText:{
        fontSize:15,
        color: '#C2C2C2',
        fontWeight: '500',
        textAlign:'center'
    },
    reqAmtText:{
        fontSize: 30,
        fontWeight: '500',
        color: '#C2C2C2',
        alignSelf: 'center',
        paddingVertical: 5,
    },
    reqFiatAmtText:{
        fontSize: 25,
        color: '#C2C2C2',
        alignSelf: 'center',
        paddingBottom: 5,
    },
    reqDetailText:{
        fontSize: 15,
        color: '#E9E9E9',
    },
});

module.exports = {
    ...requestStyles,
    ...appStyles,
    ...walletStyles,
    ...styles
}
