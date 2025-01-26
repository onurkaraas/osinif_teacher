import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { useContext, useEffect, useState } from "react";
import { API_URL, defApiFunc } from "../../api";
import { AuthContext } from "../../context/AuthContext";
import { Image } from "expo-image";
import { mainButton } from "../../components/buttons";
import Spinner from "react-native-loading-spinner-overlay";
import updateProfile from "../../api/user/updateProfile";
import drawerScreensTitle from "../../components/drawer/drawerScreensTitle";
import DrawerScreensTitle from "../../components/drawer/drawerScreensTitle";
const AvatarScreen = () => {
  const { userInfo, user, setIsProfileUpdated, setUser } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  console.log(selectedAvatar);
  useEffect(() => {
    defApiFunc("getAvatars", {
      userid: userInfo.ID,
    }).then(
      (res) => {
        console.log("avatars", res.data);
        setAvatars(
          res.data.map((item) => ({
            ...item,
            LINK: "/assets/img/avatars/" + item.LINK,
          })),
        );
        setLoading(false);
      },
      (err) => {
        console.log("err", err);
      },
    );
  }, []);

  useEffect(() => {
    if (avatars.length > 0) {
      setSelectedAvatar({
        ID: avatars?.find((item) => item?.LINK === userInfo?.AVATAR).ID,
        LINK: userInfo?.AVATAR,
      });
    }
  }, [userInfo, avatars]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingTop: 10,

        backgroundColor: COLORS.primary,
      }}
    >
      <DrawerScreensTitle title={"Avatarım"} />

      <FlatList
        data={avatars}
        numColumns={4}
        style={{
          flex: 1,
          width: SIZES.width,
        }}
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        keyExtractor={(item) => item.ID}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedAvatar(item);
            }}
            style={{
              width: SIZES.width * 0.2,
              height: SIZES.width * 0.2,
              borderRadius: SIZES.width * 0.125,
              borderColor:
                selectedAvatar?.ID === item.ID ? COLORS.blue : COLORS.black,
              borderWidth: selectedAvatar?.ID === item.ID ? 5 : 2,

              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
              backgroundColor: "#AC91B4FF",
              marginRight: 10,
            }}
          >
            <Image
              style={{
                width: SIZES.width * 0.165,
                zIndex: 999,
                height: SIZES.width * 0.165,
                borderRadius: SIZES.width * 0.125,
              }}
              contentFit={"contain"}
              source={{
                uri: "https://online.sanalegitim.com.tr/" + item.LINK,
              }}
            />
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          alignItems: "center",
          paddingVertical: 10,
          width: SIZES.width,
        }}
      >
        {mainButton({
          text: "Kaydet",
          onPress: () => {
            updateProfile(user.USERID, {
              avatar: selectedAvatar.LINK,
            }).then(
              (res) => {
                console.log("updateUser", res.data);
                if (res.data[0].STYLE === "success") {
                  setIsProfileUpdated(true);
                  setUser({
                    ...user,
                    AVATAR: selectedAvatar.LINK,
                  });
                  Alert.alert("Başarılı", "Avatar başarıyla güncellendi", [
                    {
                      text: "Tamam",
                      style: "cancel",
                    },
                  ]);
                } else {
                  Alert.alert(
                    "Hata",
                    res.data[0].MESSAGE
                      ? res.data[0].MESSAGE
                      : "Avatar güncellenirken bir hata oluştu",
                    [
                      {
                        text: "Tamam",
                        style: "cancel",
                      },
                    ],
                  );
                }
              },
              (err) => {
                console.log("err", err);
              },
            );
          },
        })}
      </View>
      {loading && <Spinner visible={true} />}
    </View>
  );
};

export default AvatarScreen;
