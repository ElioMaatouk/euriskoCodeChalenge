import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height
export const guidelineBaseWidth = 414;
export const guidelineBaseHeight = 896;

const widthRatio = windowWidth / guidelineBaseWidth;
const heightRatio = windowHeight / guidelineBaseHeight;

export const scale = size => widthRatio * size;
export const verticalScale = size => heightRatio * size;

const defaultModerateFactor = windowWidth > guidelineBaseWidth ? 0.5 : 1.25;

export const moderateScale = (size, factor = defaultModerateFactor) =>
    size + (scale(size) - size) * factor;
