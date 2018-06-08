import {
    StyleSheet
} from 'react-native';

const appStyles = require('./app');
const sendStyles = require("./send");
const pendingStyles = require('@styles/pending');
const styles = StyleSheet.create({
    reqList: {
        backgroundColor: '#212121',
    },
    reqListEmpty: {
        marginTop: 100,
        fontSize: 15,
        padding: 20,
        textAlign: 'center',
        color: '#A4A4A4'
    },
});

module.exports = {
    ...pendingStyles,
    ...appStyles,
    ...sendStyles,
    ...styles
}
