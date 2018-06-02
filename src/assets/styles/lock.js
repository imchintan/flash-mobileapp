import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const appStyles = require('./app');

const styles = StyleSheet.create({
    appLogo:{
        width: width/2.5,
        height: width/2.5,
        alignSelf: 'center',
    },
    pinTitle:{
        alignSelf: 'center',
        marginBottom: 30,
        color: '#191714',
        fontFamily: 'futura-medium',
        fontSize: 24,
        fontWeight: '400'
    },
    pinDarkTitle:{
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20,
        color: '#FFFFFF',
        fontFamily: 'futura-medium',
        fontSize: 24,
        fontWeight: '400'
    },
    pinBoxContent:{
        flexDirection: 'column',
        justifyContent: 'center',
        height: ((width-40)/3)*9/20*7,
    },
    pinBox:{
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 260
    },
    pinIcon:{
        fontSize: 40,
        color: '#CACACA',
    },
    pinIconFilled:{
        fontSize: 40,
        color: '#191714',
    },
    pinIconDarkFilled:{
        fontSize: 40,
        color: '#E0AE27',
    },
    pinNote:{
        marginTop: 20,
        padding: 20,
        fontSize: 15,
        color: '#4A4A4A',
    },
    pinResetBox:{
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0AE27',
    },
    pinResetBoxText:{
        marginTop: 20,
        fontSize: 16,
        color: '#E0AE27',
    },
    keypad:{
        width,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        position: 'absolute',
        left: 0,
        bottom: 0,
        paddingTop: 5,
    },
    keypadBox:{
        paddingTop: 7,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    keypadRow:{
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    keypadBtn:{
        width: (width-20)/3,
        height: ((width-40)/3)*9/20,
        marginBottom: 5,
        backgroundColor: 'rgba(25, 23, 20, 0.8)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    keypadBtnTran:{
        width: (width-20)/3,
        height: ((width-40)/3)*9/20,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    keypadBtnText:{
        fontSize: ((width-40)/3)*9/25,
        fontWeight: '500',
        color: '#E0AE27'
    },
    keypadBtnIcon:{
        width: ((width-40)/3)*9/25,
        height: ((width-40)/3)*9/25*92/128,
    },
});

module.exports = {
    ...appStyles,
    ...styles
}
