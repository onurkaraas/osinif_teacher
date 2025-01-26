import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#EBF5FB",
  primaryDark: "#04046A",
  blue: "#007DFE",
  lightBlue: "#25A0E2",

  purple: "#A155B9",
  secondary: "rgb(254,74,42)",
  tertiary: "rgb(254,144,0)",
  softBlack: "rgb(21,19,21)",
  softBlackTrans: "rgba(21,19,21,.05)",
  softGray: "#474747",
  softWhite: "#FFFFFF",
  darkGray: "#636D77",
  lightGray: "#999999",
  lightGray2: "#E9EBECFF",
  lightGrayOne: "#D9D9D9",
  lightGrayTwo: "#CAD1D9",
  lightGrayThree: "#E4E9ED",
  lightGrayFour: "#ECECEC",
  darkBlue: "#165BAA",

  // colors
  black: "#000000",
  white: "#FFFFFF",

  gray: "#999EA1",

  red: "#FE001E",
  aqua: "#14C4E6",
  green: "#219653",
  lightGreen: "#00FF47",
  yellow: "#fcbf49",
  orange: "#F06548",
  ashGray: "#36C9C6",

  success: "#00CC96",
  error: "#F13F11",
  softRed: "#ED6A5A",
};

export const longScreen = height > 750;

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  borderRadius: 8,

  // font sizes
  largeTitle: longScreen ? 32 : 26,
  h1: longScreen ? 24 : 22,
  h2: longScreen ? 20 : 18,
  h3: longScreen ? 18 : 16,
  body1: longScreen ? 16 : 15,
  body2: longScreen ? 14 : 13,
  body3: longScreen ? 13 : 12,
  caption: 12,

  // app dimensions
  width,
  height,
};
export const SHADOWS = {
  shadowOne: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  shadowTwo: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  shadowThree: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
};

export const FONTS = {
  H1: {
    fontSize: SIZES.h1,
    fontFamily: "Poppins_500Medium",
    color: COLORS.softBlack,
  },
  H_BOLD: {
    fontSize: SIZES.h1,
    fontFamily: "Poppins_800ExtraBold",
    color: COLORS.softBlack,
  },
  H2: {
    fontSize: SIZES.h2,
    fontFamily: "Poppins_500Medium",
    color: COLORS.softBlack,
  },
  H3: {
    fontSize: SIZES.h3,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.softBlack,
  },
  MEDIUM: {
    fontSize: SIZES.body2,
    fontFamily: "Poppins_400Regular",
    color: COLORS.softBlack,
  },
  BODY1: {
    fontSize: SIZES.body1,
    fontFamily: "Poppins_500Medium",
    color: COLORS.softBlack,
  },

  BODY2: {
    fontSize: SIZES.body2,
    fontFamily: "Poppins_400Regular",
    color: COLORS.softBlack,
  },
  BODY3: {
    fontSize: SIZES.body1,
    fontFamily: "Poppins_500Medium",
    color: COLORS.softBlack,
  },
  BODY4: {
    fontSize: SIZES.body2,
    fontFamily: "Poppins_700Bold",
    color: COLORS.softBlack,
  },
  BODY5: {
    fontSize: SIZES.body2,
    fontFamily: "Poppins_500Medium",
    color: COLORS.softBlack,
  },

  BODY6: {
    fontSize: SIZES.body2,
    fontFamily: "Poppins_500Medium",
    color: COLORS.softBlack,
  },
  CAPTION: {
    fontSize: SIZES.caption,
    fontFamily: "Poppins_400Regular",
    color: COLORS.softBlack,
  },
  CAPTION2: {
    fontSize: SIZES.caption,
    fontFamily: "Poppins_700Bold",
    color: COLORS.softBlack,
  },
  CAPTION3: {
    fontSize: SIZES.caption,
    fontFamily: "Poppins_500Medium",
    color: COLORS.softBlack,
  },
};
export const {
  primary,
  black,
  softBlack,
  darkGray,
  gray,
  lightGrayOne,
  lightGrayTwo,
  lightGrayThree,
  lightGrayFour,
  white,
  red,
  aqua,
  green,
  yellow,
  success,
  error,
} = COLORS;
export const {
  H_BOLD,
  H1,
  H2,
  H3,
  MEDIUM,
  BODY1,
  BODY2,
  BODY3,
  BODY4,
  BODY5,
  BODY6,
  CAPTION,
  CAPTION2,
  CAPTION3,
} = FONTS;

const appTheme = { COLORS, SIZES, SHADOWS, FONTS };

export default appTheme;
