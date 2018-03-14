import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');

module.exports = StyleSheet.create({
    reqList: {
        backgroundColor: '#FCFCFC',
    },
});
