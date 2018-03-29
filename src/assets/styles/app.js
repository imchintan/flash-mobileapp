import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');

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
    }
});
