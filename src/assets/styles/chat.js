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
        backgroundColor: '#EFEFEF',
        borderRadius: 10,
    },
    chatTabUnRead:{
        backgroundColor: '#F1F1F1',
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
    chatHtmName:{
        width: width - 190,
        color: '#6A6A6A',
        fontSize: 16,
        fontWeight: 'bold',
    },
    chatHtmNameUnread:{
        color: '#000',
    },
    chatMsgTime:{
        color: '#6A6A6A',
        fontSize: 16,
        fontWeight: 'bold'
    },
    chatMsgText:{
        color: '#787878',
        fontWeight: 'normal',
        fontSize: 13,
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
    }
});

module.exports = {
    ...appStyles,
    ...styles
}
