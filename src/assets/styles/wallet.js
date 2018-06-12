import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const appStyles = require('./app');
const activityStyles = require('./activity');
const styles = StyleSheet.create({
    walletHeader:{
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height:'100%',
        position: 'absolute',
        left: '20%'
    },
    walletHeaderTitle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 2,
    },
    walletIcon:{
        width: 25,
        height: 25,
    },
    walletLabel:{
        paddingLeft: 5,
        color:'#FFFFFF',
        fontFamily: 'futura-medium',
        fontSize: 22,
    },
    walletConversionRate:{
        color:'rgba(255,255,255,0.8)',
        fontSize: 14,
    },
    walletBalanceTab:{
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 15,
        width: width,
        backgroundColor: '#191714',
    },
    walletBalanceLabel:{
        color:'rgba(255,255,255,0.6)',
        fontSize: 18,
        marginBottom: -5,
    },
    walletBalanceDetail:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    walletBalance:{
        color:'rgba(255,255,255,0.9)',
        fontSize: 18,
        top: 1,
    },
    walletBalanceInFiatCurrency:{
        color:'#FFFFFF',
        fontWeight: '500',
        fontSize: 25,
    },
    exchangeIcon:{
        marginHorizontal: 8,
        color:'rgba(255,255,255,0.7)',
        fontSize: 18,
    },
    badge:{
        minWidth:20,
        height:20,
        borderRadius:10,
        backgroundColor:'#E0AE27',
        position: 'absolute',
        right: 2,
        top: 2,
        paddingHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeText:{
        textAlign: 'center',
        color:'#000',
        fontSize: 12,
        fontWeight: '500',
    },
});

module.exports = {
    ...appStyles,
    ...activityStyles,
    ...styles
}
