import {
    StyleSheet
} from 'react-native';

const appStyles = require('./app');
const loginStyles = require('@styles/login');
const styles = StyleSheet.create({

});

module.exports = {
    ...loginStyles,
    ...appStyles,
    ...styles,
}
