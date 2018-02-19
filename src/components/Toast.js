import { Platform } from 'react-native';
import Toast from 'react-native-root-toast';

let commonProps = {
    duration: Toast.durations.LONG,
    shadow: true,
    animation: true,
    hideOnPress: true,
    textStyle:{
        fontSize: 14,
    }
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
    showTop: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...topProps
    }),
    showBottom: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...bottomProps
    }),
    show: (msg)=> Toast.show(msg,{
        ...commonProps,
        ...centerProps
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
