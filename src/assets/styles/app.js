import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { FontSize } from '@lib/utils';
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
        marginTop: -15,
        width,
    },
    webViewCreateWallet:{
        marginTop: 50,
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
    },

    legalDisclaimer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0002'
    },
    legalDisclaimerBox:{
        backgroundColor: '#FFF',
        margin: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    legalDisclaimerHr:{
        width: width - 80,
        borderBottomWidth: 1,
        borderColor: '#989898',
    },
    legalDisclaimerText:{
        paddingVertical: 10,
        fontSize: FontSize(16,0.75),
        color: '#666666',
    },
    legalDisclaimerDNS:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 5
    },
    legalDisclaimerDNSText:{
        fontSize: FontSize(15,0.75),
        color: '#565656'
    },
    legalDisclaimerDNSIcon:{
        fontSize: FontSize(18,0.75),
        color: '#565656'
    },
    legalDisclaimerBtn:{
        marginVertical: 12,
        alignSelf: 'center'
    },
    legalDisclaimerBtnText:{
        fontSize: FontSize(17,0.75),
        fontWeight: 'bold',
        color: '#E0AE27'
    },
});
