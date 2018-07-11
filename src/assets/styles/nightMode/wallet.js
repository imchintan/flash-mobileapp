import {
    StyleSheet
} from 'react-native';

const appStyles = require('./app');
const activityStyles = require('./activity');
const walletStyles = require('@styles/wallet');
const styles = StyleSheet.create({

});

module.exports = {
    ...walletStyles,
    ...appStyles,
    ...activityStyles,
    ...styles
}
