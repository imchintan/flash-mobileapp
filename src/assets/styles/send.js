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
        backgroundColor:'#222222',
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
        fontSize: 15,
        color: '#A4A4A4',
    },
    fab:{
        zIndex: 9999,
        ...Platform.select({
            ios: {
                top: 155,
            },
            android: {
                top: 133,
            },
        }),
        width: 40,
        height: 40,
        borderRadius: 20,
        shadowColor: 'rgba(255,255,255, 0.9)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.7,
        backgroundColor: '#333'
    },
    fabText:{
        fontSize: 12,
    },
    scanQRLabel:{
        position: 'absolute',
        top: 35,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF',
        zIndex: 999
    },
    scanQRBoxImg:{
        flex: 1,
        width: '100%',
        zIndex: 900
    },
});

module.exports = {
    ...appStyles,
    ...requestStyles,
    ...styles
}
