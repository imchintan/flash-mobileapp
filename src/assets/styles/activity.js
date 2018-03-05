import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { height, width } = Dimensions.get('window');
const appStyles = require('./app');

module.exports = StyleSheet.create({    
    txnTab: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - 40,
        height: 70,
        padding:10,
        marginBottom: 10,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.3)',
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.5,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    txnIcon: {
        width: 35,
        height: 36,
        resizeMode: 'contain',
    },
    txnDetail:{
        width: width - 210,
    },
    txnAmount:{
        color: '#333333',
        fontSize: 15,
        fontWeight: '600',
    },
    txnRecvFrom:{
        color: '#666666',
        fontSize: 12,
        fontStyle: 'italic',
        fontWeight: '400',
    },
    txnDateTime:{
        paddingTop: 2,
        color: '#4A4A4A',
        fontSize: 13,
    },
    txnTag:{
        width: 90,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#007E33',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txnTagSent:{
        width: 90,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EE517C',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txnTagLabel:{
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
