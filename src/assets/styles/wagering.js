import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { FontSize } from '@lib/utils';

const { width } = Dimensions.get('window');
const appStyles = require('./app');
const myAccountStyles = require('./myAccount');

const styles = StyleSheet.create({
    content:{
        flex:1,
        backgroundColor: '#EFEFEF',
    },
    eventTab:{
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - 30,
        paddingVertical:10,
        paddingHorizontal: 15,
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
    },
    eventTabImage:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    eventTabDetail:{
        width: width - 125,
    },
    eventTabTitle:{
        fontSize: 17,
        fontWeight: '400',
        color: '#333',
    },
    eventTabPlayers:{
        fontSize: 14,
        color: '#4A4A4A',
    },
    eventTabCreatedBy:{
        fontSize: 13,
        color: '#787878',
        marginBottom: 2,
    },
    eventTabT1otalBid:{
        fontSize: 15,
        color: '#4A4A4A',
        marginBottom: 2,
    },
    eventTabExpireTime:{
        flexDirection:'row',
        alignItems: 'center',
        marginTop: 2,
    },
    eventTabExpireTimeIcon:{
        fontSize: 22,
        color: '#cf9f1e',
        marginRight: 5,
    },
    eventTabExpireTimeText:{
        fontSize: 18,
        color: '#B98E1B',
    },
    eventTabJoinBtn:{
        backgroundColor: '#E0AE27',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    eventTabJoinBtnText:{
        color: '#191714',
        fontSize: 16,
    },
    oracleProfileDetail:{
        width: '100%',
        backgroundColor: '#191714',
        paddingBottom: 20,
    },
    oracleProfileImage:{
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    oracleProfileImageBtn:{
        width: 80,
        height: 80,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#9B9B9B',
        borderRadius: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    oracleProfileName:{
        marginBottom: 5,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    oracleProfileNameText:{
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '500'
    },
    oracleProfileEditIcon:{
        bottom: -5,
        paddingLeft: 10,
        fontSize: 22,
        color: '#c2c2c2'
    },
    oracleProfileRow:{
        marginBottom: 5,
        flexDirection: 'row',
    },
    oracleProfileCompanyText:{
        color: '#FEFEFE',
        fontSize: 16,
    },
    oracleProfileCompanyIcon:{
        paddingRight: 10,
        fontSize: 20,
        color: '#c2c2c2'
    },
    oracleProfileEmailIcon:{
        paddingRight: 10,
        fontSize: 18,
        color: '#c2c2c2'
    },
    oracleCreateEventBtn:{
        marginTop: 25,
        marginBottom: 15
    },
    oracleProfileSetup:{
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#000D',
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    oracleProfileSetupTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E2E2E2',
        textAlign: 'center',
        width: 280,
        marginBottom: 30,
    },
    oracleProfileSetupNote:{
        fontSize: 16,
        color: '#E2E2E2',
        textAlign: 'center',
        marginHorizontal: 30,
        marginBottom: 30,
    },
    oracleProfileContent:{
        margin: 20,
    },
    oracleProfile:{
        marginBottom: 10,
    },
    oracleProfileInputBox:{
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 15,
        height: 44,
        borderWidth: 1.5,
        borderRadius:10,
        borderColor: '#ddd'
    },
    oracleProfileInput:{
        fontSize: 16,
        width: '100%',
        color: '#333'
    },
    oracleProfileLabel:{
        fontSize: 16,
        paddingHorizontal: 5,
        marginBottom:2,
        fontWeight: "500",
        color: '#565656'
    },
    oracleActiveDeactiveLink:{
        alignSelf: 'center',
        borderBottomWidth: 0.7,
        borderColor: '#787878',
        marginBottom: 30,
    },
    oracleActiveDeactiveLinkText:{
        fontSize: 14,
        color: '#787878',
        fontStyle: 'italic',
    },
    eventRadioBtnGrp:{
        flexDirection: 'row',
        marginVertical: 10,
    },
    eventRadioBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    eventRadioBtnIcon:{
        fontSize: 17,
        color: '#333',
        marginRight: 5
    },
    eventRadioBtnText:{
        fontSize: 17,
        color: '#333',
    },
    optionalText:{
        fontSize: 14,
        fontWeight: 'normal',
        color: '#565656',
    },
    eventLimitInputGrp:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    eventLimitIcon:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#666'
    },
    eventLimitInput:{
        justifyContent: 'center',
        width: (width/2) - 40,
        paddingHorizontal: 15,
        height: 44,
        borderWidth: 1.5,
        borderRadius:10,
        borderColor: '#ddd'
    },
    eventListEmpty:{
        marginTop: 50,
        textAlign: 'center',
        color: '#4A4A4A',
        fontSize: 16,
    },
    eventDetail:{
        margin: 20,
        paddingBottom: 30,
    },
    eventDetailTitle:{
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
    },
    eventDetailTitleText:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
    eventDetailTitleTextWithImg:{
        width: width - 100
    },
    eventDetailCreatedBy:{
        marginTop: 2,
        fontSize: 20,
        color: '#333'
    },
    eventDetailVol:{
        marginTop: 2,
        fontSize: 18,
        color: '#4A4A4A'
    },
    eventDetailEndsOn:{
        marginTop: 2,
        fontSize: 16,
        color: '#666'
    },
    eventPlayerDetail:{
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 15,
    },
    eventPlayerDetailRow:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:5
    },
    eventPlayerDetailLabel:{
        textAlign: 'right',
        fontSize: 16,
        paddingRight: 5,
        color: '#4A4A4A',
        width: 45,
    },
    eventPlayerDetailVs:{
        width: 25,
        textAlign: 'center',
        fontSize: 18,
        color: '#4A4A4A',
    },
    eventPlayerDetailHeader:{
        width: (width/2) - 70,
        textAlign: 'center',
        fontSize: 16,
        color: '#4A4A4A',
    },
    eventPlayerDetailValue:{
        textAlign: 'center',
        width: (width/2) - 70,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
    eventPlayerDetailWon:{
        textAlign: 'center',
        width: (width/2) - 70,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0D0',
    },
    eventPlayerDetailLoss:{
        textAlign: 'center',
        width: (width/2) - 70,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F55',
    },
    eventPlayerJoin:{
        marginTop: 10,
        width: (width/2) - 70,
        alignItems: 'center'
    },
    eventPlayerJoinBtn:{
        paddingVertical: 8,
        paddingHorizontal: 18
    },
    eventPlayerJoinBtnText:{
        fontSize: 15
    },
    eventCancelledReason:{
        textAlign: 'justify',
        fontSize: 15,
        color: '#D33',
    },
    eventDescription:{
        textAlign: 'justify',
        fontSize: 14,
        color: '#666666',
    },
    eventExpiryOnLabel:{
        marginTop: 20,
        marginBottom: 10,
        fontSize: 18,
        color: '#666666',
        textAlign: 'center',
    },
    eventExpiryOnText:{
        fontSize: 30,
        color: '#E0AE27',
        marginBottom: 20,
        alignSelf: 'center',
        backgroundColor: '#191714',
        padding: 20,
        borderRadius: 10,
    },
    wagerLimit:{
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    wagerCancelBtn:{
        position:'absolute',
        top: Platform.OS === 'ios'?10:0,
        right: 15
    },
    wagerCancelBtnText:{
        fontSize: 40,
        color: '#E1E1E1'
    },
    wagerTitle:{
        width: 250,
        fontSize: 25,
        fontFamily: 'futura-medium',
        paddingVertical: 15,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#333'
    },
    wagerSetAllFlash:{
        alignSelf: 'flex-end',
        marginRight: 5,
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#1a0dab',
        color:'#1a0dab'
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
    walletBalanceLabel:{
        color:'#787878',
        fontSize: FontSize(18),
        marginBottom: -5,
    },
    walletBalanceDetail:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    walletBalance:{
        color:'#454545',
        fontSize: FontSize(18),
        top: 1,
    },
    exchangeIcon:{
        marginHorizontal: 8,
        color:'#989898',
        fontSize: FontSize(18),
    },
    walletBalanceInFiatCurrency:{
        color:'#333',
        fontWeight: '500',
        fontSize: FontSize(25),
    },
    eventMyWagerRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7,
    },
    eventMyWagerPlayer:{
        fontSize: 15,
        color: '#333'
    },
    eventMyWagerVol:{
        fontSize: 13,
        color: '#666',
    },
    eventMyWagerVolWon:{
        fontSize: 13,
        color: '#0D0',
    },
    eventMyWagerVolLost:{
        fontSize: 13,
        color: '#D33',
    },
    headerBtnText:{
        fontSize: 17,
        padding:5,
        color: '#fff',
    },
    eventExpired:{
        position: 'absolute',
        width: width,
        backgroundColor: '#F33',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eventExpiredText:{
        fontSize: 15,
        color: '#fff',
        padding: 5,
    },
    eventDetailBtn:{
        marginTop: 20,
        width: 200,
        alignItems: 'center'
    },
    declareWinerBtn:{
        marginTop: 20,
        width: 280,
        alignItems: 'center'
    },
    eventTabResultWaiting:{
        fontSize: 17,
        color: '#0080ff',
        fontStyle: 'italic'
    },
    eventTabResultTied:{
        fontSize: 17,
        color: '#FFA500',
        fontStyle: 'italic'
    },
    eventTabResultCancelled:{
        fontSize: 17,
        color: '#d33',
        fontStyle: 'italic'
    },
    eventTabResultDeclare:{
        fontSize: 17,
        color: '#0D0',
        fontStyle: 'italic'
    },
    eventTabEventExpired:{
        fontSize: 17,
        color: '#F33',
        fontStyle: 'italic'
    },

    legalDisclaimer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0002'
    },
    legalDisclaimerBox:{
        backgroundColor: '#FFF',
        margin: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    legalDisclaimerHr:{
        width: width - 80,
        borderBottomWidth: 1,
        borderColor: '#989898',
    },
    legalDisclaimerText:{
        paddingVertical: 10,
        fontSize: 16,
        color: '#666666',
    },
    legalDisclaimerDNS:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 5
    },
    legalDisclaimerDNSText:{
        fontSize: 15,
        color: '#565656'
    },
    legalDisclaimerDNSIcon:{
        fontSize: 18,
        color: '#565656'
    },
    legalDisclaimerBtn:{
        marginVertical: 12,
        alignSelf: 'center'
    },
    legalDisclaimerBtnText:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#E0AE27'
    },

});

module.exports = {
    ...appStyles,
    ...myAccountStyles,
    ...styles,
}
