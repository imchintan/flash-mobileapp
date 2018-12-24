import {
    StyleSheet,
    Dimensions
} from 'react-native';

const appStyles = require('./app');
const htmStyles = require('@styles/htm');
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    htmProfileDetailNote:{
        fontSize: 15,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#C2C2C2',
        margin: 30,
    },
    htmProfileLabel:{
        fontSize: 16,
        paddingHorizontal: 5,
        marginBottom:2,
        fontWeight: "500",
        color: '#F2F2F2'
    },
    htmProfileInput:{
        fontSize: 16,
        width: '100%',
        color: '#E2E2E2'
    },
    htmProfileNote:{
        width: width-200,
        fontSize: 12,
        paddingHorizontal: 5,
        fontStyle: 'italic',
        color: '#C2C2C2'
    },
    htmWantToBuySellInputGrp:{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    htmWantToBuySellBtnText:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#F2F2F2'
    },
    htmWantToBuySellInputText:{
        width: 60,
        textAlign: 'center',
        fontSize: 16,
        color: '#C2C2C2',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#E2E2E2',
        paddingVertical: 5,
    },
    htmCurrencyCheckIcon:{
        fontSize: 18,
        width: 30,
        paddingLeft: 10,
        color: '#E4E4E4'
    },
    htmCurrencyLabel:{
        fontSize: 14,
        paddingHorizontal: 5,
        marginBottom:2,
        color: '#E2E2E2',
        fontWeight: 'bold'
    },
    htmCurrencyNote:{
        width: width-240,
        fontSize: 12,
        paddingHorizontal: 5,
        fontStyle: 'italic',
        color: '#C2C2C2'
    },
    htmCurrencyNote1:{
        fontSize: 16,
        fontStyle: 'italic',
        color: '#E2E2E2',
        marginTop: -5,
        marginBottom: 10,
    },
    htmCurrencyWantToBuySellBtnText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F2F2F2'
    },
    htmCurrencyWantToBuySellInputText:{
        width: 60,
        textAlign: 'center',
        fontSize: 14,
        color: '#C2C2C2',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#E2E2E2',
        paddingVertical: 2,
    },
    htmCurrencyBuySellQtyLabel:{
        fontSize: 14,
        paddingLeft: 20,
        marginTop: 2,
        color: '#F2F2F2'
    },
    htmCurrencyBuySellQtyInput:{
        width: 120,
        height: 28,
        fontSize: 14,
        color: '#C2C2C2',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#E2E2E2',
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    htmActiveDeactiveLink:{
        alignSelf: 'center',
        borderBottomWidth: 0.7,
        borderColor: '#A2A2A2',
        marginBottom: 30,
    },
    htmActiveDeactiveLinkText:{
        fontSize: 14,
        color: '#A2A2A2',
        fontStyle: 'italic',
    },
    htmFilterArrow:{
        alignSelf: 'flex-end',
        color: '#000',
        fontSize: 30,
        right: 8,
        top: -13,
        marginBottom: -32,
    },
    htmFilterContent:{
        backgroundColor: '#000',
        paddingVertical: 20,
        borderRadius: 3,
    },
    htmFilterWantToTitle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#414141',
        paddingHorizontal: 15,
        paddingVertical: 2,
    },
    htmFilterWantToLabel:{
        fontSize: 18,
        color: '#F2F2F2',
        fontWeight: 'bold',
    },
    htmFilterWantToValueIcon:{
        fontSize: 16,
        color: '#E2E2E2'
    },
    htmFilterWantToValueText:{
        fontSize: 15,
        color: '#E2E2E2',
        paddingLeft: 5,
        paddingRight: 15,
    },
    htmFilterSliderCustomMarker:{
        marginTop: 2,
        paddingHorizontal:5,
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor: '#C2C2C2'
    },
    htmProfileDetailTab:{
        width: width-40,
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#414141',
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
    },
    htmProfileDetailTabLabel:{
        fontSize: 14,
        color: '#F2F2F2',
    },
    htmProfileDetailTabCurrency:{
        fontSize: 14,
        color: '#E2E2E2',
        marginBottom: 2,
    },
    htmProfileDetailTabBuySellText:{
        fontSize: 13,
        color: '#C8C8C8',
    },
    htmProfileStatusText:{
        fontSize: 14,
        color: '#B2B2B2',
        fontStyle: 'italic',
    },
    htmBuySellText:{
        fontSize: 16,
        color: '#E2E2E2',
    },
    htmBuySellTradeLimit:{
        marginLeft: 35,
        marginTop: 2,
        fontSize: 14,
        color: '#C2C2C2',
    },
    htmExchangesTab:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 28,
        backgroundColor: '#515151',
        borderRadius: 6,
        bottom: -8,
    },
    htmExchangesTabTitle:{
        paddingLeft: 10,
        paddingRight: 5,
        marginTop:0,
    },
    htmExchangesTabIcon:{
        backgroundColor: '#313131',
        fontSize: 28,
        color: '#FFB400',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        paddingHorizontal: 5,
    },

    optionContainer: {
        borderRadius:5,
        width:width-30,
        backgroundColor:'rgba(60, 60, 60,0.85)',
        left:15,
    },
    cancelStyle: {
        borderRadius: 5,
        width: width-30,
        backgroundColor:'rgba(60, 60, 60,0.85)',
        padding: 10
    },
    canceTextStyle: {
        fontSize: 18,
        color: '#F3F3F3',
        textAlign: 'center'
    },
    optionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#7D7D7D'
    },
    optionTextStyle: {
        fontSize: 16,
        color: '#E2E2E2',
    },
});

module.exports = {
    ...htmStyles,
    ...appStyles,
    ...styles,
}
