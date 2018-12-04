import {
    StyleSheet
} from 'react-native';

const appStyles = require('./app');
const wageringStyles = require('@styles/wagering');
const styles = StyleSheet.create({

});

module.exports = {
    ...wageringStyles,
    ...appStyles,
    ...styles,
}
