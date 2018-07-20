import {
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export const getAdjustedSize = (size) => {
    return size;
    // console.log(size, parseInt(size) * (1.2 - 0.000256 * width) * width / 414);
    // return parseInt(size) * (1.2 - 0.000256 * width) * width / 414;
}
