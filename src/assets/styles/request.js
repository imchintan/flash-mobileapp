import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');

const styles = StyleSheet.create({
    requestBox:{
        margin: 20,
    },
    requestRow:{
        marginBottom: 20,
    },
    requestRowLabel:{
        fontSize: 16,
        paddingHorizontal: 15,
        fontWeight: "500",
        color: '#4A4A4A'
    },
    requestRowNote:{
        fontSize: 13,
        paddingHorizontal: 15,
        color: '#9B9B9B'
    },
    requestRowInputBox:{
        justifyContent: 'center',
        marginTop: 5,
        width: '100%',
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1.5,
        borderRadius:25,
        borderColor: '#ddd'
    },
    requestRowInput:{
        fontSize: 16,
        color: '#333',
        width: '100%',
    },
    requestRowAmtLabelBox:{
        borderTopLeftRadius:25,
        borderBottomLeftRadius:25,
        backgroundColor: '#191714',
    },
    requestRowAmtLabel:{
        marginLeft: 20,
        height: '100%',
        paddingVertical: 14,
        paddingRight: 15,
        fontSize: 14,
        fontWeight: '500',
        color: '#E0AE27',
        backgroundColor: '#191714'
    },
    requestRowClearBtn:{
        marginLeft: 10,
        backgroundColor: '#dedede'
    },
    requestRowClearBtnTxt:{
        color: '#000'
    },
    reqDetailModal:{
        backgroundColor: '#0007',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reqDetailBox:{
        width: '100%',
        paddingHorizontal: 20,
    },
    reqDetailCloseIcon:{
        fontSize: 18,
        color: '#E0AE27',
        padding: 5,
        paddingRight: 0
    },
    reqDetailHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#191714',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    reqDetailTitle:{
        fontSize: 18,
        color: '#E0AE27',
    },
    reqDetailBody:{
        backgroundColor: '#FFFFFF',
        padding: 15,
        width: width - 40,
    },
    reqDetailRow:{
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    reqDetailIcon:{
        marginRight: 10,
        width: 50,
        height: 50,
        borderRadius: 25
    },
    reqAmtText:{
        fontSize: 30,
        fontWeight: '500',
        color: '#191714',
        alignSelf: 'center',
        paddingVertical: 5,
    },
    reqDownArrow:{
        fontSize: 20,
        color: '#d55',
        alignSelf: 'center',
        paddingVertical: 5,
    },
    reqDetailText:{
        fontSize: 15,
        color: '#333333',
    },
    reqBtn:{
        backgroundColor: '#191714',
        width:'50%',
        borderRadius: 0,
        alignItems: 'center',
    },
    reqBtnLabel:{
        fontSize: 18,
        color: '#FFFFFF',
    },
    reqFeeText:{
        alignSelf: 'center',
        color: '#008fd0'
    },
});

module.exports = {
    ...appStyles,
    ...styles
}
