import {
    StyleSheet
} from 'react-native';
const activityStyles = require('@styles/activity');
const styles = StyleSheet.create({
    txnListEmpty: {
        marginTop: 100,
        fontSize: 15,
        padding: 20,
        textAlign: 'center',
        color: '#C2C2C2'
    },
    txnList: {
        backgroundColor: '#212121',
    },
    label:{
        fontSize: 18,
        color: '#E9E9E9',
        marginTop: 15,
    },
    hr:{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#FFB400',
        marginBottom: 15,
    },
});

module.exports = {
    ...activityStyles,
    ...styles
}
