import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');
const activityStyles = require('./activity');

const styles = StyleSheet.create({
    balanceBox:{
        alignItems: 'center',
        backgroundColor: '#00AFFD',
        paddingVertical: 20,
    },
    balanceLabel:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
    },
    balanceLabelText:{
        fontStyle: 'italic',
    },
    balanceText:{
        marginVertical: 10,
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    otherBalanceText:{
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        fontStyle: 'italic',
        paddingVertical: 2,
    },
    recentTxnLabel: {
        margin: 20,
        marginBottom: 10,
        color: '#000080',
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: '600',
    },
});

module.exports = {
    ...appStyles,
    ...activityStyles,
    ...styles
}
