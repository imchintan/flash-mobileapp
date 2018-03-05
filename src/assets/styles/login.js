import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');

const styles = StyleSheet.create({

});

module.exports = {
    ...appStyles,
    ...styles
}
