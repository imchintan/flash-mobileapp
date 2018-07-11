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
});

module.exports = {
    ...activityStyles,
    ...styles
}
