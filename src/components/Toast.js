import { Platform } from 'react-native';
import Toast from 'react-native-root-toast';

let commonProps = {
    duration: Toast.durations.LONG,
    shadow: true,
    animation: true,
    hideOnPress: true,
    opacity: 0.9,
    textStyle:{
        fontSize: 16,
        fontFamily: 'Microsoft Tai Le',
    },
}
let topProps = {
    ...Platform.select({
        ios: {
            position: 87,
        },
        android: {
            position: 65,
        },
    }),
}
let bottomProps = {
    position: -70,
}
let centerProps = {
    position: Toast.positions.CENTER,
}
let errorProps = {
    backgroundColor: '#CC0000'
}
let successProps = {
    backgroundColor: '#007E33'
}
let warnProps = {
    backgroundColor: '#FF8800'
}
let infoProps = {
    backgroundColor: '#E0AE27',
    textStyle:{
        fontSize: 16,
        fontFamily: 'Microsoft Tai Le',
        color: '#191714',
    },
}

module.exports = {
    ...Toast,
    errorTop: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...topProps,
        ...errorProps
    }),
    errorBottom: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...bottomProps,
        ...errorProps
    }),
    error: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...centerProps,
        ...errorProps
    }),
    showTop: (msg, props={})=> Toast.show(msg,{
        ...commonProps,
        ...topProps,
        ...infoProps,
        ...props
    }),
    showBottom: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...bottomProps,
        ...infoProps
    }),
    show: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...centerProps,
        ...infoProps
    }),
    successTop: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...topProps,
        ...successProps
    }),
    successBottom: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...bottomProps,
        ...successProps
    }),
    success: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...centerProps,
        ...successProps
    }),
    warnTop: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...topProps,
        ...warnProps
    }),
    warnBottom: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...bottomProps,
        ...warnProps
    }),
    warn: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...centerProps,
        ...warnProps
    }),

}
