import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { BODY6, COLORS, FONTS, H2, MEDIUM, SIZES } from "../../constants/theme";
import drawerListComp from "./drawerListComp";
import GoalsScreen from "../../screens/DrawerStack/GoalsScreen";

const customDrawer = (props) => {
  const { user, navigation, signOut, notificationsCount, counters } = props;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 0,
        margin: 0,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
      }}
      {...props}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Image
          resizeMode={"cover"}
          style={{
            width: "100%",
            height: SIZES.height * 0.175,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
          source={require("../../../assets/images/drawerImage.png")}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
            width: "100%",
            height: SIZES.height * 0.175,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />
        <View
          style={{
            position: "absolute",
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            zIndex: 2,
          }}
        >
          <View
            style={{
              height: "100%",
              marginRight: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#B190B6",
                borderRadius: 75 / 2,
              }}
              source={{
                uri: "https://online.sanalegitim.com.tr" + user?.AVATAR,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                ...H2,
                width: SIZES.width * 0.45,
                fontSize: 18,
                color: COLORS.white,
              }}
            >
              {user?.NAME} {user?.LASTNAME}
            </Text>
            <Text
              style={{
                ...MEDIUM,
                width: SIZES.width * 0.425,

                fontSize: 14,
                color: COLORS.white,
              }}
            >
              {user?.USERTYPE}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          height: SIZES.height * 0.75,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {drawerListComp({
          icon: "user-o",
          iconType: "font-awesome",
          title: "Profilim",
          onPress: () => navigation.navigate("Profile"),
        })}
        {drawerListComp({
          icon: "settings-outline",
          iconType: "ionicon",
          title: "Ayarlarım",
          onPress: () => navigation.navigate("Settings"),
        })}
        {drawerListComp({
          icon: "face-man-profile",
          iconType: "material-community",
          title: "Avatarım",
          onPress: () => navigation.navigate("Avatar"),
        })}

        {drawerListComp({
          icon: "document-outline",
          iconType: "ionicon",
          title: "Sıkça Sorulan Sorular",
          onPress: () => navigation.navigate("FAQ"),
        })}
        {drawerListComp({
          icon: "inbox-full",
          iconType: "material-community",
          title: "Yasal Bilgiler",
          onPress: () => navigation.navigate("LegalInfo"),
        })}

        {drawerListComp({
          icon: "ticket-outline",
          iconType: "material-community",
          title: "Bize Ulaşın",
          onPress: () => navigation.navigate("ContactUs"),
        })}
        {drawerListComp({
          icon: "graph",
          iconType: "octicon",
          title: "Hedeflerim",
          onPress: () => navigation.navigate("Goals"),
        })}
        {drawerListComp({
          icon: "exit-outline",
          iconType: "ionicon",
          title: "Çıkış",
          onPress: () => {
            signOut();
          },
        })}
      </View>
    </View>
  );
};

export default customDrawer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  menuItemsCard: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
