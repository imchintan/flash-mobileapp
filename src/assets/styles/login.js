import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');

const styles = StyleSheet.create({
    loginBox: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appLogo: {
        width: '60%',
        maxHeight: 250,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    loginInputRow: {
        justifyContent: 'center',
        marginTop: 25,
        width: '100%',
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
