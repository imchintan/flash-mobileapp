import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
    appHeaderIcon:{
        marginTop: 4,
        ...Platform.select({
            ios: {
                width: 35,
                height: 35,
            },
            android: {
                width: 90,
                height: 90,
            },
        }),
    },
    headerTextLogo:{
        resizeMode: 'contain',
        ...Platform.select({
            ios: {
                marginTop: 7,
                height: 40,
                width: 273*40/100,
            },
            android: {
            },
        }),
    },
    appIcon25:{
        width: 25,
        height: 25,
    },
    headerBackIcon:{
        paddingLeft: 3,
        paddingRight: 10,
        fontSize: 40,
        color: '#FFFFFF',
    },
    headerFAIcon:{
        fontSize: 30,
        padding: 5,
        color: '#FFFFFF',
    },
    webViewFP:{
        marginTop: -20,
        width,
    },
    webViewCreateWallet:{
        marginTop: 10,
        width,
    },
    label:{
        fontSize: 18,
        color: '#4A4A4A',
        marginTop: 15,
    },
    hr:{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#9F9F9F',
        marginBottom: 15,
    },
    mandatoryField:{
        bottom: -10,
        fontSize: 20,
        color: 'red'
    }
});
