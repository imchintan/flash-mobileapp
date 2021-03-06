import {
    StyleSheet
} from 'react-native';

const appStyles = require('./app');
const sendStyles = require("@styles/send");

const styles = StyleSheet.create({
    reqList: {
        backgroundColor: '#FCFCFC',
    },
    reqListEmpty: {
        marginTop: 100,
        fontSize: 15,
        padding: 20,
        textAlign: 'center'
    },
});

module.exports = {
    ...appStyles,
    ...sendStyles,
    ...styles
}
