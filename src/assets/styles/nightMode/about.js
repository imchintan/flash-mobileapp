import {
    StyleSheet,
    Dimensions
} from 'react-native';
const { width } = Dimensions.get('window');
const appStyles = require('./app');
const aboutStyles = require('@styles/about');
const styles = StyleSheet.create({
    aboutInfoText:{
        marginBottom: 20,
        textAlign: 'justify',
        fontSize: 15,
        color: '#C2C2C2'
    },
    aboutInfoTitleText:{
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '500',
        color: '#F3F3F3'
    },
    aboutInfoAdvIcon:{
        paddingHorizontal: 10,
        fontSize: 12,
        color: '#F3F3F3'
    },
    aboutInfoAdvText:{
        width: width - 75,
        textAlign: 'justify',
        fontSize: 14,
        color: '#C2C2C2'
    },
});

module.exports = {
    ...aboutStyles,
    ...appStyles,
    ...styles
}
