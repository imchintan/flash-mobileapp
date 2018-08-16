import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { width } = Dimensions.get('window');
const appStyles = require('./app');
const sharingStyles = require('@styles/sharing');
const styles = StyleSheet.create({
    payoutCodeNote:{
        margin: 30,
        textAlign: 'justify',
        fontStyle: 'italic',
        color: '#9F9F9F',
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
        borderColor: '#9B9B9B',
        fontSize: 24,
        color: '#E9E9E9'
    },
    payoutCodeInputError:{
        borderColor: '#f00',
    },
    payoutCodeSharingFee:{
        alignSelf: 'center',
        fontSize: 18,
        color: '#C2C2C2',
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
        backgroundColor: '#404040'
    },
    // addAddressRow:{
    //     flexDirection:'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },
    addAddressInput:{
        paddingHorizontal: 10,
        width: '100%',
        height: 45,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#7D7D7D',
        fontSize: 13,
        color: '#C2C2C2',
        backgroundColor: '#313131'
    },
    addAddressPerInput:{
        paddingHorizontal: 10,
        width: 110,
        height: 45,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#7D7D7D',
        fontSize: 13,
        textAlign: 'center',
        color: '#C2C2C2',
        backgroundColor: '#313131'
    },
    addAddressRemarkInput:{
        paddingHorizontal: 10,
        width: width - 215,
        height: 45,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#7D7D7D',
        fontSize: 13,
        color: '#C2C2C2',
        backgroundColor: '#313131'
    },
    addAddressRemoveDisBtn:{
        width: 34,
        height: 34,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#707070',
    },
    addAddressRemoveDisBtnIcon:{
        fontSize: 24,
        color: '#9F9F9F'
    },
    shareCodeBox:{
        width: 150,
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius:10,
        borderColor: '#7D7D7D',
        backgroundColor: '#606060',
    },
    shareCodeText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E9E9E9',
    },
    shareCodePer:{
        width: 100,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius:10,
        borderColor: '#7D7D7D',
        backgroundColor: '#606060',
    },
    shareCodePerText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E9E9E9',
    },
    shareCodeActionLink:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#7D7D7D',
    },
    shareCodeActionLinkIcon:{
        fontSize: 15,
        marginRight: 5,
        color:'#C2C2C2'
    },
    shareCodeActionLinkLabel:{
        fontSize: 16,
        color:'#C2C2C2'
    },
    shareCodeActionLinkDiv:{
        top: 2,
        marginHorizontal: 5,
        fontSize: 18,
        color:'#C2C2C2'
    },
    shareCodeAddressTab:{
        flexDirection: 'row',
        backgroundColor: '#606060',
        alignSelf: 'center',
        alignItems: 'center',
        width: width - 50,
        height: 80,
        padding:15,
        marginBottom: 10,
        borderRadius: 5,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(255,255,255, 0.3)',
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.5,
            },
            android: {
                elevation: 3,
            },
        }),
        justifyContent: 'space-between'
    },
    shareCodeAddress:{
        color: '#E9E9E9',
        fontSize: 14,
        fontWeight: '600',
    },
    shareCodeAddressPer:{
        width: 50,
        textAlign: 'right',
        color: '#E9E9E9',
        fontSize: 24,
        fontWeight: '600',
    },
    shareCodeAddressRemark:{
        color: '#C2C2C2',
        fontStyle: 'italic',
        fontSize: 13,
    },
});

module.exports = {
    ...sharingStyles,
    ...appStyles,
    ...styles,
}
