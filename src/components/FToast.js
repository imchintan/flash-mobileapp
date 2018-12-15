import { Platform, NativeModules } from 'react-native';
const FToast = NativeModules.FToast;

// Y offset
const Y_OFFSET_TOP = Platform.select({ ios: 87, android: 65 });
const Y_OFFSET_BOTTOM = 70;
const Y_OFFSET_CENTER = 0;

// Color
const COLOR_ERROR = '#CC0000';
const COLOR_SUCCESS = '#007E33';
const COLOR_WARNING = '#FF8800';
const COLOR_INFO = '#000000';

module.exports = {
    errorTop: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.TOP,
        Y_OFFSET_TOP,
        COLOR_ERROR
    ),
    errorBottom: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.BOTTOM,
        Y_OFFSET_BOTTOM,
        COLOR_ERROR
    ),
    error: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.CENTER,
        Y_OFFSET_CENTER,
        COLOR_ERROR
    ),

    showTop: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.TOP,
        Y_OFFSET_TOP,
        COLOR_INFO
    ),
    showBottom: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.BOTTOM,
        Y_OFFSET_BOTTOM,
        COLOR_INFO
    ),
    show: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.CENTER,
        Y_OFFSET_CENTER,
        COLOR_INFO
    ),

    successTop: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.TOP,
        Y_OFFSET_TOP,
        COLOR_SUCCESS
    ),
    successBottom: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.BOTTOM,
        Y_OFFSET_BOTTOM,
        COLOR_SUCCESS
    ),
    success: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.CENTER,
        Y_OFFSET_CENTER,
        COLOR_SUCCESS
    ),

    warnTop: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.TOP,
        Y_OFFSET_TOP,
        COLOR_WARNING
    ),
    warnBottom: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.BOTTOM,
        Y_OFFSET_BOTTOM,
        COLOR_WARNING
    ),
    warn: (msg)=> FToast.showCustom(
        msg,
        FToast.LONG,
        FToast.CENTER,
        Y_OFFSET_CENTER,
        COLOR_WARNING
    ),
}
