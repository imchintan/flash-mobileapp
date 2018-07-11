import {
    StyleSheet
} from 'react-native';

const appStyles = require('@styles/app');
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#212121',
    },
    content:{
        backgroundColor: '#212121',
    },
    label:{
        fontSize: 18,
        color: '#FFB400',
        marginTop: 15,
    },
    hr:{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#FFB400',
        marginBottom: 15,
    },
});

module.exports = {
    ...appStyles,
    ...styles,
}
