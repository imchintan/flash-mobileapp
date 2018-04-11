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
    },
    appLogo: {
        marginTop: 60,
        marginBottom: 20,
        width: width*0.5,
        height: width*0.5,
        maxWidth: 300,
        maxHeight: 300,
    },
    loginInputRow: {
        justifyContent: 'center',
        marginTop: height < 750?30:50,
        width: width-80,
        maxWidth: 500,
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
        marginTop: height < 750?30:60,
        marginBottom: height < 750?10:20,
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
