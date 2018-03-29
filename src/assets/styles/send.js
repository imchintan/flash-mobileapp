import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');
const requestStyles = require('./request');

const styles = StyleSheet.create({
    content:{
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    sendFormBox:{
        width:'100%',
        ...Platform.select({
            ios: {
                marginTop:77,
            },
            android: {
                marginTop:55,
            },
        }),
        height: 100,
        backgroundColor:'#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendFormRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#A4A4A4',
        paddingHorizontal: 5,
        width: '80%',
        paddingBottom:5,
        bottom: 5,
    },
    sendFormPlaceholder:{
        fontSize: 18,
        color: '#A4A4A4',
    },
    fab:{
        zIndex: 9999,
        ...Platform.select({
            ios: {
                top: 150,
            },
            android: {
                top: 127,
            },
        }),
        width: 50,
        height: 50,
        borderRadius: 25,
        shadowColor: 'rgba(255,255,255, 0.9)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.7,
        backgroundColor: '#333'
    },
    fabText:{
        fontSize: 18,
    },
    scanQRLabel:{
        position: 'absolute',
        top: 35,
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        width: '100%',
        zIndex: 999
    },
    scanQRBoxImg:{
        flex: 1,
        width: '100%',
    },
});

module.exports = {
    ...appStyles,
    ...requestStyles,
    ...styles
}
