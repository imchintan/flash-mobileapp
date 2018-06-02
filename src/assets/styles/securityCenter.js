import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const appStyles = require('./app');

const styles = StyleSheet.create({
    securityCenterBox: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: width,
        backgroundColor: '#191714',
    },
    securityCenterBoxIcon: {
        fontSize: 100,
        color: '#E0AE27'
    },
    securityCenterBoxNote: {
        textAlign: 'center',
        fontFamily: 'futura-medium',
        marginTop: 10,
        fontSize: 18,
        color: '#E0AE27'
    },
    securityCenterTab:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 100,
        backgroundColor: '#EDEDEDED',
        borderBottomWidth: 0.5,
        marginBottom: 1,
        borderBottomColor: '#787878',
    },
    securityCenterTabLeftIcon:{
        fontSize: 30,
        color: '#787878'
    },
    securityCenterTabContent:{
        paddingHorizontal: 15,
        width: width - 75,
    },
    securityCenterTabTitle:{
        fontSize: 20,
        fontFamily: 'futura-medium',
        color: '#191714'
    },
    securityCenterTabNote:{
        fontSize: 15,
        color: '#191714'
    },
    securityCenterTabRightIcon:{
        fontSize: 40,
        color: '#9b9b9b'
    },
});

module.exports = {
    ...appStyles,
    ...styles
}
