import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');

const styles = StyleSheet.create({
    loginBox: {
        width,
        paddingHorizontal: 40,
        alignItems:'center',
        justifyContent:'center',
    },
    appLogo: {
        marginTop: -30,
        marginBottom: 20,
        width: width*0.5,
        maxHeight: width*0.5,
    },
    loginInputRow: {
        justifyContent: 'center',
        marginTop: 30,
        width: width-80,
        paddingHorizontal: 15,
        height: 60,
        borderWidth: 1.5,
        borderRadius:30,
        borderColor: '#ddd',
        backgroundColor:'#FFFFFF'
    },
    loginInput: {
        fontSize: 16,
        fontWeight: '400'
    },
    loginBtn: {
        marginTop: 30,
        width: 180,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    loginBtnLabel: {
        fontSize: 22,
        fontWeight: '400'
    },
    loginFormOtherText:{
        fontSize: 15,
        color: '#FFFFFF'
    },
});

module.exports = {
    ...appStyles,
    ...styles
}
