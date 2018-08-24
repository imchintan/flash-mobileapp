import {
    StyleSheet,
    Dimensions
} from 'react-native';

const appStyles = require('./app');
const myAccountStyles = require('./myAccount');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    htmProfileContent:{
        margin: 20,
    },
    htmProfile:{
        marginBottom: 10,
    },
    htmProfileInputBox:{
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 15,
        height: 44,
        borderWidth: 1.5,
        borderRadius:10,
        borderColor: '#ddd'
    },
    htmProfileInput:{
        fontSize: 16,
        width: '100%',
        color: '#333'
    },
    htmProfileLabel:{
        fontSize: 16,
        paddingHorizontal: 5,
        marginBottom:2,
        fontWeight: "500",
        color: '#565656'
    },
    htmProfileNote:{
        width: width-200,
        fontSize: 12,
        paddingHorizontal: 5,
        fontStyle: 'italic',
        color: '#787878'
    },
    htmWantToBuySell:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    htmWantToBuySellInputGrp:{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#989898',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    htmWantToBuySellBtn:{
        paddingHorizontal: 10,
    },
    htmWantToBuySellBtnText:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#787878'
    },
    htmWantToBuySellInputText:{
        width: 60,
        textAlign: 'center',
        fontSize: 16,
        color: '#4A4A4A',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#989898',
        paddingVertical: 5,
    },
    htmCurrency:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    htmCurrencyCheckIcon:{
        fontSize: 18,
        width: 30,
        paddingLeft: 10,
        color: '#565656'
    },
    htmCurrencyWantToBuySell:{
        marginTop: 10,
        marginLeft: 30,
    },
    htmCurrencyLabel:{
        fontSize: 14,
        paddingHorizontal: 5,
        marginBottom:2,
        color: '#333'
    },
    htmCurrencyNote:{
        width: width-240,
        fontSize: 12,
        paddingHorizontal: 5,
        fontStyle: 'italic',
        color: '#787878'
    },
    htmCurrencyNote1:{
        fontSize: 16,
        fontStyle: 'italic',
        color: '#787878',
        marginTop: -5,
        marginBottom: 10,
    },
    htmCurrencyWantToBuySellBtnText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#787878'
    },
    htmCurrencyWantToBuySellInputText:{
        width: 60,
        textAlign: 'center',
        fontSize: 14,
        color: '#4A4A4A',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#989898',
        paddingVertical: 2,
    },
    htmSwitch:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    htmSwitchLeft:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A1A1A1',
        // borderWidth: 1,
        // borderColor: '#A1A1A1',
        width: 50,
        height: 30,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    htmSwitchRight:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A1A1A1',
        width: 50,
        height: 30,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    htmSwitchActive:{
        backgroundColor: '#E0AE27',
        height: 32,
        top:0.5,
        elevation: 3,
    },
    htmSwitchText:{
        color: '#E4E4E4',
        fontSize: 14,
        fontWeight: 'bold',
    },
    htmSwitchActiveText:{
        color: '#191714',
    },
    htmSwitchActiveTextStyle:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        bottom: 2,
    },
    htmSwitchInactiveTextStyle:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        bottom: 2,
        paddingRight: 18,
    },
    htmChatBadge:{
        position: 'absolute',
        fontFamily: 'futura-medium',
        backgroundColor: '#E0AE27',
        color: '#191714',
        borderRadius: 10,
        height: 20,
        paddingVertical: 2,
        width: 20,
        textAlign: 'center',
        fontSize: 13,
        top: 0,
        right: 0
    },
    htmProfileDetail:{
        width: '100%',
        backgroundColor: '#191714'
    },
    htmProfileImage:{
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
        marginTop: 30
    },
    htmProfileName:{
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    htmProfileNameText:{
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '500'
    },
    htmProfileEditIcon:{
        bottom: -5,
        paddingLeft: 10,
        fontSize: 22,
        color: '#c2c2c2'
    },
    htmProfileEmail:{
        flexDirection: 'row',
        marginBottom: 5,
    },
    htmProfileEmailIcon:{
        top: 2,
        paddingRight: 5,
        fontSize: 16,
        color: '#c2c2c2'
    },
    htmProfileEmailText:{
        fontSize: 18,
        color: '#c2c2c2'
    },
    htmProfileDetailNote:{
        fontSize: 15,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#4A4A4A',
        margin: 30,
    },
    htmProfileSetup:{
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#000D',
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    htmProfileSetupNote:{
        fontSize: 16,
        color: '#E2E2E2',
        textAlign: 'center',
        marginHorizontal: 30,
        marginBottom: 30,
    },
    htmActiveDeactiveLink:{
        alignSelf: 'center',
        borderBottomWidth: 0.7,
        borderColor: '#787878',
        marginBottom: 30,
    },
    htmActiveDeactiveLinkText:{
        fontSize: 14,
        color: '#787878',
        fontStyle: 'italic',
    },
    htmMapLocationErrorNote:{
        flex: 1,
        marginHorizontal: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    htmMapLocationErrorNoteText:{
        textAlign: 'center',
        fontSize: 18,
        color: "#191714",
        marginBottom: 20,
    },
});

module.exports = {
    ...appStyles,
    ...myAccountStyles,
    ...styles
}
