import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');

module.exports = StyleSheet.create({
    txnList: {
        backgroundColor: '#FCFCFC',
    },
    txnListEmpty: {
        marginTop: 100,
        fontSize: 15,
        padding: 20,
        textAlign: 'center'
    },
    txnShowAllBtn:{
        backgroundColor: '#FFB400'
    },
    txnShowAllBtnText:{
        fontSize: 16,
        fontWeight: '500',
    },
});
