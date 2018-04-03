import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');

const styles = StyleSheet.create({
    profile:{
        margin: 20,
    },
    profileRow:{
        marginBottom: 15,
    },
    profileRowLabel:{
        fontSize: 16,
        paddingHorizontal: 15,
        fontWeight: "500",
        color: '#4A4A4A'
    },
    profileRowInputBox:{
        justifyContent: 'center',
        marginTop: 5,
        width: '100%',
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1.5,
        borderRadius:25,
        borderColor: '#ddd'
    },
    profileRowQRBox:{
        justifyContent: 'center',
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 15,
    },
    profileRowInput:{
        fontSize: 16,
        color: '#333'
    },
    profileSettingRow:{
        marginBottom: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileSettingLabel:{
        fontSize: 16,
        color: '#4A4A4A'
    },
    profileSettingValue:{
        fontSize: 18,
        fontWeight: "500",
        color: '#333'
    },
    setting2faTitle:{
        marginTop: 10,
        marginBottom: 5,
        fontSize: 22,
        fontWeight: "500",
        color: '#333'
    },
    setting2faNote:{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 5,
    },
    setting2faNoteBold:{
        fontWeight: "500",
        color: '#333'
    },
    setting2faNoteText:{
        fontSize: 14,
        color: '#4A4A4A'
    },
});

module.exports = {
    ...appStyles,
    ...styles
}
