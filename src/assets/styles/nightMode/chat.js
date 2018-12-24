import {
    StyleSheet
} from 'react-native';

const appStyles = require('./app');
const chatStyles = require('@styles/chat');

const styles = StyleSheet.create({
});

module.exports = {
    ...chatStyles,
    ...appStyles,
    ...styles,
}
