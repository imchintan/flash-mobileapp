import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { isIphoneX, FontSize } from '@lib/utils'
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
    htmProfileReview:{
        borderBottomWidth:1,
        borderColor: '#E0AE27',
        fontSize: 18,
        paddingTop: 5,
        marginBottom: 7,
        color: '#E0AE27'
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
        color: '#666666',
        fontWeight: 'bold'
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
    htmCurrencyBuySellQty:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    htmCurrencyBuySellQtyLabel:{
        fontSize: 14,
        paddingLeft: 20,
        marginTop: 2,
        color: '#4A4A4A'
    },
    htmCurrencyBuySellQtyInput:{
        width: 120,
        height: 28,
        fontSize: 14,
        color: '#4A4A4A',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#989898',
        paddingHorizontal: 10,
        paddingVertical: 0,
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
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.5)',
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.7,
            },
            android: {
                top:0.5,
                elevation: 3,
            },
        }),
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
        ...Platform.select({
            ios: {},
            android: {
                bottom: 2,
            },
        }),
    },
    htmSwitchInactiveTextStyle:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        ...Platform.select({
            ios: {},
            android: {
                bottom: 2,
            },
        }),
        paddingRight: 18,
    },
    htmChatBadge:{
        position: 'absolute',
        backgroundColor: '#E0AE27',
        borderRadius: 10,
        height: 20,
        paddingVertical: 2,
        width: 20,
        top: 0,
        right: 0
    },
    htmChatBadgeText:{
        fontFamily: 'futura-medium',
        color: '#191714',
        textAlign: 'center',
        fontSize: 13,
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
    htmProfileDetailTitle:{
        alignSelf:'center',
        width: 280,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginTop: 30,
    },
    htmProfileDetailNote:{
        fontSize: 15,
        textAlign: 'center',
        color: '#4A4A4A',
        margin: 30,
        marginTop: 20,
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
    htmProfileSetupTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E2E2E2',
        textAlign: 'center',
        width: 280,
        marginBottom: 30,
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
    htmDetailTab:{
        width: width-40,
        backgroundColor: '#EFEFEF',
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
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
        fontSize: 14,
        color: '#333333',
    },
    htmProfileDetailTabCurrency:{
        fontSize: 14,
        color: '#333333',
        marginBottom: 2,
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
        fontSize: 22,
        paddingHorizontal: 5,
        left:2,
        ...Platform.select({
            ios: {},
            android: {
                paddingTop: 5,
            },
        }),
    },
    htmDetailBuySell:{
        marginBottom: 10,
    },
    htmBuySellTradeLimit:{
        marginLeft: 35,
        marginTop: 2,
        fontSize: 14,
        color: '#4A4A4A',
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
        paddingVertical: 20,
        borderRadius: 3,
    },
    htmFilterRow:{
        flexDirection: 'row',
    },
    htmFilterRow1:{
        width: 270,
    },
    htmFilterWantTo:{
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    htmFilterWantToTitle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e2e2e2',
        paddingHorizontal: 15,
        paddingVertical: 2,
    },
    htmFilterWantToLabel:{
        fontSize: 18,
        color: '#4A4A4A',
        fontWeight: 'bold',
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
    htmAdDetail:{
        marginTop: 10,
        alignSelf: 'center',
    },
    htmAdDetailBox:{
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        padding: 15,
        margin: 10,
    },
    htmAdDetailLabel:{
        width: 120,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        paddingTop: 5
    },
    htmAdDetailValue:{
        width: width - 190,
        fontSize: 14,
        color: '#565656',
        paddingTop: 5
    },
    htmProfileStatusIcon:{
        fontSize: 12,
        color: '#00FF00',
    },
    htmProfileStatusText:{
        fontSize: 14,
        color: '#787878',
        fontStyle: 'italic',
    },
    htmHeaderTitleBox:{
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 1,
        width: '60%',
        height:'100%',
        position: 'absolute',
        left: '20%'
    },
    htmHeaderTitle:{
        fontSize: 22,
        fontWeight: '500',
        color: '#FFFFFF'
    },
    htmHeaderSubTitle:{
        fontSize: 14,
        color: '#E2E2E2',
    },
    htmExchangesTab:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 28,
        backgroundColor: '#E2E2E2',
        borderRadius: 6,
        bottom: -8,
    },
    htmExchangesTabTitle:{
        paddingLeft: 10,
        paddingRight: 5,
        marginTop:0,
        borderRightWidth: 2,
        borderColor: '#dfdfdf'
    },
    htmExchangesTabIcon:{
        backgroundColor: '#666666',
        fontSize: 26,
        color: '#FFFFFF',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        paddingHorizontal: 5,
    },
    htmProfileRating:{
        flexDirection: 'row',
        marginVertical: 5,
    },
    htmProfileRatingIcon:{
        fontSize: 30,
        color: '#FFB400',
        marginHorizontal: 5,
    },
    htmRiskWarningText:{
        marginHorizontal: 15,
        fontSize: 11,
        fontStyle: 'italic',
        color: '#9B9B9B',
        textAlign: 'center',
    },
    htmFeedbackContent:{
        flex:1,
        paddingVertical: 15,
    },
    htmFeedback:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9E9E9',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10
    },
    htmFeedbackStatus:{
        height: 50,
        width: 50,
        borderRadius: 25,
        marginTop: 2,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    htmFeedbackStatusIcon:{
        fontSize: 25,
    },
    htmFeedbackDetail:{
        marginLeft: 10,
    },
    htmFeedbackRating:{
        flexDirection: 'row',
    },
    htmFeedbackTitleText:{
        width: width - 120,
        marginBottom: 5,
        fontSize: 17,
        color: '#121212'
    },
    htmFeedbackComment:{
        width: width - 120,
        paddingTop: 5,
        fontSize: 15,
        color: '#333'
    },
    htmFeedbackTime:{
        paddingTop: 5,
        fontSize: 13,
        fontStyle: 'italic',
        color: '#787878',
    },
    tradeReviewFilter:{
        flexDirection: 'row',
        marginBottom: 10
    },
    tradeReviewFilterBtn:{
        flexDirection: 'row',
        marginLeft: 15,
        alignItems: 'center'
    },
    tradeReviewFilterIcon:{
        marginRight: 5,
        fontSize: 16,
        color: '#4A4A4A'
    },
    tradeReviewFilterText:{
        fontSize: 15,
        color: '#4A4A4A'
    },
    tradeCaution:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0002'
    },
    tradeCautionBox:{
        backgroundColor: '#FFF',
        margin: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    tradeCautionHr:{
        width: width - 80,
        borderBottomWidth: 1,
        borderColor: '#989898',
    },
    tradeCautionText:{
        paddingVertical: 10,
        fontSize: 16,
        color: '#666666',
    },
    tradeCautionDNS:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 5
    },
    tradeCautionDNSText:{
        fontSize: 15,
        color: '#565656'
    },
    tradeCautionDNSIcon:{
        fontSize: 18,
        color: '#565656'
    },
    tradeCautionBtn:{
        marginVertical: 12,
        alignSelf: 'center'
    },
    tradeCautionBtnText:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#E0AE27'
    },

    htmAdFilterBtn:{
        position:'absolute',
        top: Platform.OS === 'ios'?10:0,
        right: 15
    },
    htmAdFilterBtnText:{
        fontSize: 40,
        color: '#E1E1E1'
    },
    htmAdFilterTitle:{
        width: 250,
        fontSize: 25,
        fontFamily: 'futura-medium',
        paddingVertical: 15,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#333'
    },
    htmAdFilterSubTitle:{
        marginTop: -17,
        marginBottom: 7,
        width: 250,
        fontSize: 15,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#565656',
    },
    htmAdFilterLabel:{
        marginLeft: 5,
        marginVertical: 5,
    },

    htmAdsLabel:{
        marginBottom: 5,
    },
    htmAdsOptional:{
        fontSize: 15,
    },
    htmAdList: {
        backgroundColor: '#FCFCFC',
    },
    htmAdTab:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECECEC',
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
        padding: 10,
    },
    htmAdUserImage:{
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight:10,
    },
    htmAdTabDetail:{
        flexDirection: 'row',
    },
    htmAdUserTitle:{
        width: width-240,
        flexDirection: 'row',
        alignItems: 'center',
    },
    htmAdStatusIcon:{
        fontSize: 14,
        color: '#C2C2C2',
        marginRight: 5,
    },
    htmAdOnlineStatus:{
        color: '#00DD00',
    },
    htmAdUserName:{
        width: width-260,
        fontSize: 16,
        color: '#333',
        fontWeight: '500'
    },
    htmAdConversion:{
        width: width-110,
        fontSize: 14,
        color: '#4A4A4A',
    },
    htmAdConversionLimits:{
        width: width-240,
        fontSize: 13,
        color: '#787878',
        paddingTop: 2,
    },
    htmAdPriceDetail:{
        width: 130,
        paddingLeft: 5,
        alignItems: 'flex-end'
    },
    htmAdPriceTitle:{
        fontSize: 15,
        color: '#121212',
        marginTop: 5
    },
    htmAdPriceValue:{
        fontSize: 14,
        color: '#787878',
        paddingTop: 2,
        textAlign: 'right'
    },
    htmAdsHr:{
        width: width-30,
        borderBottomWidth: 1,
        borderColor: '#9F9F9F',
        margin: 15,
        marginBottom: 5
    },
    htmAdEmailIcon:{
        top: 2,
        paddingRight: 5,
        fontSize: 16,
        color: '#565656'
    },
    htmAdEmailText:{
        fontSize: 18,
        color: '#565656'
    },
    htmAdRating:{
        flexDirection: 'row',
        marginVertical: 5,
    },
    htmAdRatingIcon:{
        fontSize: 30,
        color: '#FFB400',
        marginHorizontal: 5,
    },
    htmProfileFixLocationText:{
        marginLeft: 5,
        fontSize: 13,
        color: '#454545'
    },
    htmProfileFixLocationBtn:{
        borderBottomWidth: 1,
        borderColor: '#0645AD'
    },
    htmProfileFixLocationBtnText:{
        fontSize: 18,
        color: '#0645AD'
    },

    walletBalanceTab:{
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 15,
        marginHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#E9E9E9',
    },
    walletBalanceRowBox:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    walletBalanceLabel:{
        color:'#787878',
        fontSize: FontSize(18,0.75),
        marginBottom: -5,
    },
    walletBalanceDetail:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    walletBalance:{
        color:'#454545',
        fontSize: FontSize(18,0.75),
        top: 1,
    },
    exchangeIcon:{
        marginHorizontal: 8,
        color:'#989898',
        fontSize: FontSize(18,0.75),
    },
    walletBalanceInFiatCurrency:{
        color:'#333',
        fontWeight: '500',
        fontSize: FontSize(25,0.75),
    },
    fiatCurrencyRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom: 10,
    },
    selectFiatCurrency:{
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#0645AD',
    },
    selectFiatCurrencyText:{
        fontSize: 15,
        color: '#0645AD'
    },
    selectedFiatCurrencies:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10 
    },
    selectedFiatCurrency:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        padding: 10,
        backgroundColor: '#DFDFDF',
        marginRight: 10,
        marginTop: 5,
        borderRadius: 15,
    },
    selectedFiatCurrencyName:{
        fontSize: 15,
        color: '#333',
        paddingRight: 5
    },
    deselectedFiatCurrencyBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#A1A1A1',
        height: 15
    },
    deselectedFiatCurrencyBtnText:{
        fontSize: 13,
        color: '#666',
        paddingLeft: 5
    },

});

module.exports = {
    ...appStyles,
    ...myAccountStyles,
    ...styles
}
