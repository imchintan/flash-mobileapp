import {
    StyleSheet
} from 'react-native';

const requestStyles = require('./request');
const sendStyles = require('@styles/send');
const styles = StyleSheet.create({

});

module.exports = {
    ...sendStyles,
    ...requestStyles,
    ...styles
}
