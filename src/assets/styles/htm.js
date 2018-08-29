import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { isIphoneX } from '@lib/utils'

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
    htmProfileDetailTab:{
        width: width-40,
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
    },
    htmProfileDetailTabImg:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    htmProfileDetailTabBox:{
        marginLeft: 15,
        width: width - 180,
    },
    htmProfileDetailTabLabel:{
        fontSize: 16,
        color: '#333333',
    },
    htmProfileDetailTabCurrency:{
        fontSize: 14,
        color: '#333333',
        fontStyle: 'italic',
        top: -3,
    },
    htmProfileDetailTabBuySell:{
        flexDirection:'row',
        alignItems: 'center',
        height: 20,
    },
    htmProfileDetailTabBuySellText:{
        fontSize: 13,
        color: '#666666',
    },
    htmProfileDetailTabBuySellValue:{
        fontSize: 15,
        fontWeight: 'bold'
    },
    htmProfileDetailTabBuySellIcon:{
        fontSize: 20,
        padding: 5,
        left:2,
    },
    htmDetailBuySell:{
        marginBottom: 10,
    },
    htmDetailBuySellRow:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 35,
    },
    htmBuySellText:{
        fontSize: 16,
        color: '#333333',
    },
    htmMap:{
        flex:1,
        width:'100%',
        ...Platform.select({
            ios: {
                marginTop: isIphoneX()?92:77,
            },
            android: {
                marginTop: 55,
            },
        }),
    },
    htmFilter:{
        flex:1,
        padding: 10,
        position: 'absolute',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.5)',
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.7,
                marginTop: isIphoneX()?82:67,
            },
            android: {
                elevation: 10,
                marginTop: 45,
            },
        }),
        top :0,
        right: 0,
        zIndex: 999999
    },
    htmFilterArrow:{
        alignSelf: 'flex-end',
        color: '#FFF',
        fontSize: 30,
        right: 8,
        top: -13,
        marginBottom: -32,
    },
    htmFilterContent:{
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 3,
    },
    htmFilterRow:{
        width: 250,
    },
    htmFilterWantTo:{
        flexDirection: 'row',
    },
    htmFilterWantToLabel:{
        fontSize: 18,
        color: '#333',
        marginBottom: 2
    },
    htmFilterWantToVal:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#b98e1b',
        marginBottom: 2
    },
    htmFilterWantToValue:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 5,
    },
    htmFilterWantToValueIcon:{
        fontSize: 16,
        color: '#4A4A4A'
    },
    htmFilterWantToValueText:{
        fontSize: 15,
        color: '#4A4A4A',
        paddingLeft: 5,
        paddingRight: 15,
    },
    htmFilterBtn:{
        backgroundColor: '#C2C2C2',
        alignSelf: 'center',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    htmFilterBtnText:{
        fontSize: 18,
        color: '#191714',
    },
    htmFilterSliderCustomMarker:{
        marginTop: 2,
        paddingHorizontal:5,
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor: '#191714'
    },
    htmFilterSliderSelected:{
        backgroundColor: '#E0AE27',
    },
    htmFilterSliderContainer:{
        height:40,
        alignSelf: 'center',
    },
    htmFilterSliderTrack:{
        height:5,
        bottom: 1
    },
});

module.exports = {
    ...appStyles,
    ...myAccountStyles,
    ...styles
}
