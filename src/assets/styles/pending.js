import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');
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
    reqShowAllBtn:{
        backgroundColor: '#FFB400'
    },
    reqShowAllBtnText:{
        fontSize: 16,
        fontWeight: '500',
    },
});

module.exports = {
    ...appStyles,
    ...sendStyles,
    ...styles
}
