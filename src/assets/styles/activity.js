import {
    StyleSheet
} from 'react-native';

const appStyles = require('./app');

const styles = StyleSheet.create({
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

module.exports = {
    ...appStyles,
    ...styles
}
