import {
    StyleSheet,
    Dimensions
} from 'react-native';

const appStyles = require('./app');

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
        width: '60%',
        height:'100%',
        position: 'absolute',
        left: '20%'
    },
    chatHeaderTitle:{
        fontSize: 22,
        fontWeight: '500',
        color: '#FFFFFF'
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
        marginVertical: 20,
        fontSize: 14,
        color: '#565656',
    }
});

module.exports = {
    ...appStyles,
    ...styles
}
