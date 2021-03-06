import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const appStyles = require('./app');
const requestStyles = require('./request');

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    chatTab:{
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 10,
        padding:10,
        backgroundColor: '#EAEAEA',
        borderRadius: 10,
    },
    chatTabUnRead:{
        backgroundColor: '#E1E1E1',
    },
    chatProfileIcon:{
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    chatMsgBox:{
        marginHorizontal: 10,
        width: width - 110
    },
    chatMsgDetailBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    chatHtmNameBox:{
        width: width - 210,
        flexDirection:'row',
        alignItems: 'center'
    },
    chatHtmName:{
        width: width - 225,
        color: '#000000',
        fontSize: 16,
    },
    chatHtmNameUnread:{
        color: '#000',
        fontWeight: 'bold',
    },
    chatMsgTime:{
        color: '#000000',
        fontSize: 16,

    },
    chatMsgText:{
        color: '#565656',
        fontWeight: 'normal',
        fontSize: 14,
    },
    chatMsgTextUnread:{
        color: '#454545',
        fontWeight: 'bold',
    },
    feedBackValueRow:{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    feedBacRadioBtn:{
        flexDirection: 'row',
        marginRight: 20,
        alignItems:'center'
    },
    feedBacRadioBtnIcon:{
        fontSize: 16,
        color: '#4A4A4A'
    },
    feedBacRadioBtnText:{
        fontSize: 15,
        color: '#4A4A4A',
        paddingLeft: 5,
        paddingRight: 15,
    },
    feedBackRatingBtnGrp:{
        alignSelf: 'center',
    },
    feedBackRatingBtn:{
        marginHorizontal: 5,
    },
    feedBackRatingBtnIcon:{
        fontSize: 30,
        color: '#FFB400',
    },
    feedBackCommentBox:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#9B9B9B',
        padding: 10,
        height: 80,
        fontSize: 17,
        color: '#4A4A4A'
    },
    feedbackNote:{
        textAlign: 'center',
        fontSize: 15,
        marginTop: 20
    },
    closeChat:{
        backgroundColor: '#FFB400',
        height: '100%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10
    },
    feedBackCurrencyBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    feedBackCurrencyBtnText:{
        fontSize: 14,
        paddingHorizontal: 5,
        marginBottom:2,
        color: '#4A4A4A',
    },
    feedBackCurrencyBtnIcon:{
        fontSize: 18,
        width: 20,
        paddingRight: 5,
        color: '#565656'
    },
    feedBackCurrencyInput:{
        fontSize: 14,
        color: '#4A4A4A',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#989898',
        marginBottom: 10,
        marginLeft: 25,
        paddingVertical: 2,
        paddingHorizontal: 20
    },
    chatChannelIconBox:{
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatChannelIcon:{
        fontSize: 25,
        color: '#191714'
    },
    chatChannelSuccessIcon:{
        fontSize: 25,
        color: 'green'
    },
    chatChannelPendingIcon:{
        fontSize: 25,
        color: '#FFB400'
    },
    chatChannelFailedIcon:{
        fontSize: 25,
        color: '#F80'
    },
    chatStatusIcon:{
        fontSize: 14,
        color: '#C2C2C2',
        marginRight: 5,
    },
    chatOnlineStatusIcon:{
        color: '#00DD00',
    },
    chatHeaderTitleBox:{
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 1,
        width: '65%',
        height:'100%',
        position: 'absolute',
        left: '20%'
    },
    chatHeaderTitle:{
        fontSize: 22,
        fontWeight: '500',
        color: '#FFFFFF',
        maxWidth: width - 195,
    },
    chatHeaderSubTitle:{
        fontSize: 14,
        color: '#E2E2E2',
    },
    chatProfileStatusIcon:{
        fontSize: 12,
        color: '#00FF00',
    },
    chatSystemMessage:{
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFF3D1',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 30,
        marginBottom: 10,
        fontSize: 14,
        color: '#565656',
    },
    tradeHistoryFilter:{
        flexDirection: 'row',
        // alignSelf: 'center',
        justifyContent: 'space-between',
        margin: 15,
        width: 280
    },
    tradeHistoryFilterBtn:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    tradeHistoryFilterIcon:{
        marginRight: 5,
        fontSize: 16,
        color: '#4A4A4A'
    },
    tradeHistoryFilterText:{
        fontSize: 15,
        color: '#4A4A4A',
        paddingTop: 1
    },
    channelFeedback:{
        margin:20,
        marginBottom: 0,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#EFEFEF',
    },
    channelFeedbackTitle:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    channelFeedbackTitleIcon:{
        marginTop: 5,
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    channelFeedbackTitleText:{
        width: width - 135,
        fontSize: 17,
        color: '#121212'
    },
    channelFeedbackTitleStatus:{
        width: width - 135,
        fontSize: 14,
        color: '#565656',
        marginBottom: 2,
    },
    channelFeedbackTime:{
        fontSize: 13,
        color: '#666',
    },
    channelFeedbackRating:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    channelfeedBackRatingIcon:{
        fontSize: 20,
        color: '#FFB400',
        marginLeft: 2,
    },
    channelFeedbackComment:{
        width: width - 135,
        fontSize: 15,
        color: '#454545',
    },
    channelFeedbackCurrency:{
        width: width - 135,
        fontSize: 16,
        color: '#4A4A4A',
        marginVertical:5,
    },
    channelFeedbackReadMore:{
        alignSelf: 'flex-end',
        fontSize: 16,
        color: '#05D',
        marginBottom: 2,
        backgroundColor: '#EFEFEF'
    },
    tradeDetailTab:{
        marginTop: Platform.OS == 'ios'? 15:0,
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%',
        backgroundColor: '#191714',
    },
    tradeDetailTitle:{
        color:'#FFFFFF',
        fontWeight: '500',
        fontSize: 18,
    },
    tradeDetailRate:{
        color:'rgba(255,255,255,0.9)',
        fontWeight: 'normal',
        fontSize: 14,
    },
    tradeDetailPaymentText:{
        width: width - 150,
        color:'#FFFFFF',
        fontSize: 17,
        marginVertical: 5
    },
    tradeDetailBtn:{
        alignSelf: 'center',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    tradeDetailBtnText:{
        fontSize: 18,
        color: '#191714',
    },
    tradeDetailGrayeBtn:{
        alignSelf: 'center',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#DFDFDF'
    },
});

module.exports = {
    ...appStyles,
    ...requestStyles,
    ...styles
}
