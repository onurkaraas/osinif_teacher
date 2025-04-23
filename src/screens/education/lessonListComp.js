import { Text, TouchableOpacity, View } from "react-native";
import { BODY3, COLORS, H1, SHADOWS, SIZES } from "../../../constants/theme";
import { Icon } from "@rneui/base";
import { Image } from "expo-image";
import { FILE_URL, REF_FILE_URL } from "../../../api";

const lessonListComp = ({ lesson, setSelectedLesson, setUnitList, label }) => {
  return (
    <TouchableOpacity
      key={lesson.PRODUCTCODE ?? lesson.ID}
      onPress={() => {
        setSelectedLesson(lesson);
        setUnitList ? setUnitList(lesson.units) : null;
      }}
      style={{
        backfaceVisibility: "hidden",
        flexDirection: "row",
        alignSelf: "center",
        width: SIZES.width * 0.9,
        justifyContent: "space-between",
        marginTop: 10,
        backgroundColor: "rgb(209, 216, 232)",
        height: 70,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingRight: 5,
        borderRadius: 8,
        ...SHADOWS.shadowOne,
      }}
    >
      <View>
        <Icon
          size={36}
          color={"rgb(70, 114, 176)"}
          type={"antdesign"}
          name={"play"}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit={true}
          style={{
            ...H1,
            textAlign: "center",
            fontSize: 16,
            color: COLORS.black,
          }}
        >
          {label ?? lesson?.name ?? lesson?.NAME}
        </Text>
        <Text
          style={{
            ...BODY3,
            fontSize: 14,
            color: COLORS.darkGray,
          }}
        >
          {lesson?.RELATED_CATEGORY}
        </Text>
      </View>
      <View>
        <Icon
          size={30}
          color={"black"}
          type={"entypo"}
          name={"chevron-thin-right"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default lessonListComp;
