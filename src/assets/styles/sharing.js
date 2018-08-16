import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { width } = Dimensions.get('window');
const appStyles = require('./app');

const styles = StyleSheet.create({
    payoutCodeNote:{
        margin: 30,
        textAlign: 'justify',
        fontStyle: 'italic',
        color: '#787878',
        fontSize: 14,
        lineHeight: 20
    },
    payoutCodeInput:{
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 40,
        paddingHorizontal: 15,
        width: 250,
        height: 60,
        borderWidth: 1.5,
        borderRadius:30,
        borderColor: '#ddd',
        fontSize: 24,
        color: '#333'
    },
    payoutCodeInputError:{
        borderColor: '#d55',
    },
    payoutCodeSharingFee:{
        alignSelf: 'center',
        fontSize: 18,
        color: '#666',
        marginTop: -20,
        marginBottom: 20,

    },
    addAddressTab:{
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 10,
        borderRadius:10,
        justifyContent: 'space-between',
        height: 115,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.3)',
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.5,
            },
            android: {
                elevation: 1.5,
            },
        }),
    },
    addAddressRow:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addAddressInput:{
        paddingHorizontal: 10,
        width: '100%',
        height: 45,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 13,
        color: '#333',
    },
    addAddressPerInput:{
        paddingHorizontal: 10,
        width: 110,
        height: 45,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 13,
        color: '#333',
        textAlign: 'center',
    },
    addAddressRemarkInput:{
        paddingHorizontal: 10,
        width: width - 215,
        height: 45,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 13,
        color: '#333',
    },
    addAddressRemoveBtn:{
        width: 34,
        height: 34,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    addAddressRemoveBtnIcon:{
        fontSize: 24,
        color: '#FFFFFF'
    },
    addAddressRemoveDisBtn:{
        width: 34,
        height: 34,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DFDFDF',
    },
    addAddressRemoveDisBtnIcon:{
        fontSize: 24,
        color: '#ABABAB'
    },
    shareCodeDetail:{
        alignSelf: 'center',
        width: 260,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    shareCodeBox:{
        width: 150,
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius:10,
        borderColor: '#ccc',
        backgroundColor: '#eee',
    },
    shareCodeText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    shareCodePer:{
        width: 100,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius:10,
        borderColor: '#ccc',
        backgroundColor: '#eee',
    },
    shareCodePerText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    shareCodeActionLinkTab:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 5,
    },
    shareCodeActionLink:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#191714',
    },
    shareCodeActionLinkIcon:{
        fontSize: 15,
        marginRight: 5,
        color:'#191714'
    },
    shareCodeActionLinkLabel:{
        fontSize: 16,
        color:'#191714'
    },
    shareCodeActionLinkDiv:{
        top: 2,
        marginHorizontal: 5,
        fontSize: 18,
        color:'#191714'
    },
    shareCodeAddressTab:{
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        alignItems: 'center',
        width: width - 50,
        height: 80,
        padding:15,
        marginBottom: 10,
        borderRadius: 5,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.3)',
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.5,
            },
            android: {
                elevation: 3,
            },
        }),
        justifyContent: 'space-between'
    },
    shareCodeAddressRow:{
        width: width - 130,
    },
    shareCodeAddress:{
        color: '#333333',
        fontSize: 14,
        fontWeight: '600',
    },
    shareCodeAddressPer:{
        width: 50,
        textAlign: 'right',
        color: '#333333',
        fontSize: 24,
        fontWeight: '600',
    },
    shareCodeAddressRemark:{
        color: '#666666',
        fontStyle: 'italic',
        fontSize: 13,
    },
});

module.exports = {
    ...appStyles,
    ...styles,
}
