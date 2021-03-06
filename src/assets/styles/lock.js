import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');
const appStyles = require('./app');

const styles = StyleSheet.create({
    appLogo:{
        width: width/2.5,
        height: width/2.5,
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios'?40:0,
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
        marginTop: '10%',
        marginBottom: '4%',
        color: '#FFFFFF',
        fontFamily: 'futura-medium',
        fontSize: 24,
        fontWeight: '400'
    },
    pinBoxContent:{
        flexDirection: 'column',
        justifyContent: 'center',
        height: height - (width*3/4.5),
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
        marginTop: '4%',
        fontSize: 16,
        color: '#E0AE27',
    },
    keypad:{
        width,
        position: 'absolute',
        left: 0,
        bottom: 0,
        paddingTop: 5,
    },
    keypadBox:{
        paddingTop: 7,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    keypadDarkBox:{
        paddingTop: 7,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
    fingerprint:{
        width: 40,
        height: 40,
        margin: 10,
        resizeMode: 'contain',
        alignSelf:'flex-end'
    },
});

module.exports = {
    ...appStyles,
    ...styles
}
