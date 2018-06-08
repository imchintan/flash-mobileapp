import {
    StyleSheet
} from 'react-native';

const appStyles = require('./app');
const lockStyles = require('@styles/lock');
const styles = StyleSheet.create({

});

module.exports = {
    ...lockStyles,
    ...appStyles,
    ...styles,
}
