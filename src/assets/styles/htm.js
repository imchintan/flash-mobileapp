import {
    StyleSheet
} from 'react-native';

const appStyles = require('./app');
const myAccountStyles = require('./myAccount');

const styles = StyleSheet.create({
    htmProfileContent:{
        margin: 20,
    },
    htmProfile:{
        marginBottom: 10,
    },
    htmProfileInputBox:{
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 15,
        height: 44,
        borderWidth: 1.5,
        borderRadius:10,
        borderColor: '#ddd'
    },
    htmProfileInput:{
        fontSize: 16,
        width: '100%',
        color: '#333'
    },
    htmProfileLabel:{
        fontSize: 16,
        paddingHorizontal: 5,
        marginBottom:2,
        fontWeight: "500",
        color: '#565656'
    },
    htmProfileNote:{
        fontSize: 14,
        paddingHorizontal: 5,
        fontStyle: 'italic',
        color: '#787878'
    },
});

module.exports = {
    ...appStyles,
    ...myAccountStyles,
    ...styles
}
