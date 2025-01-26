import { ActivityIndicator, ImageBackground, View } from "react-native";
import { Image } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const Splash = () => {
  return (
    <ImageBackground
      source={require("../../../assets/splash.png")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        style={{
          top: SIZES.height / 1.75 - 1,
          position: "absolute",
        }}
        size="large"
        color={COLORS.darkBlue}
      />
    </ImageBackground>
  );
};
export default Splash;
