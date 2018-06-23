import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { width } = Dimensions.get('window');
const homeStyles = require('@styles/home');
const appStyles = require('./app');
const reqStyles = require('./request');

const styles = StyleSheet.create({
    headerTextLogo:{
        resizeMode: 'contain',
        height: 40,
        width: 272*40/100,
    },
    optionContainer: {
        borderRadius:5,
        width:width-30,
        height:400,
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
    fiatCurrencyName: {
        fontSize: 16,
        color: '#E9E9E9'
    },
    fiatCurrencyUnit: {
        fontSize: 16,
        color: '#E9E9E9'
    },
    optionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#7D7D7D'
    },
});

module.exports = {
    ...reqStyles,
    ...homeStyles,
    ...appStyles,
    ...styles
}
