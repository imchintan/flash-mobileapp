import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { width } = Dimensions.get('window');
const appStyles = require('./app');
const wageringStyles = require('@styles/wagering');
const styles = StyleSheet.create({

});

module.exports = {
    ...wageringStyles,
    ...appStyles,    
    ...styles,
}
