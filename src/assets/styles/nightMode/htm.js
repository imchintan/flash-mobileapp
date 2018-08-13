import {
    StyleSheet
} from 'react-native';

const appStyles = require('./app');
const htmStyles = require('@styles/htm');
const myAccountStyles = require('./myAccount');

const styles = StyleSheet.create({

});

module.exports = {
    ...htmStyles,
    ...myAccountStyles,
    ...appStyles,
    ...styles
}
