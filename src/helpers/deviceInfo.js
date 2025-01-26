import { Dimensions } from 'react-native';
import * as Device from 'expo-device';

const msp = (dim, limit) => {
    return dim.scale * dim.width >= limit || dim.scale * dim.height >= limit;
};

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};

/**
 * Returns true of the screen is in landscape mode
 */
const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};

/**
 * Returns true if the device is a tablet
 */
const isTablet = () => {
    return Device.deviceType === 2;
};

/**
 * Returns true if the device is a phone
 */
const isPhone = () => {
    return !isTablet();
};

export { isPortrait, isLandscape, isTablet, isPhone };
