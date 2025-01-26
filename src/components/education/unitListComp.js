import { Text, TouchableOpacity, View } from "react-native";
import {
  BODY2,
  BODY3,
  COLORS,
  H1,
  SHADOWS,
  SIZES,
} from "../../constants/theme";
import { Icon } from "@rneui/base";

const unitListComp = ({ lesson, setSelectedLesson, setChapterList }) => {
  return (
    <TouchableOpacity
      key={lesson.ID}
      onPress={() => {
        setSelectedLesson(lesson);
      }}
      style={{
        backfaceVisibility: "hidden",
        flexDirection: "row",
        width: SIZES.width * 0.9,
        alignSelf: "center",
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
          justifyContent: "center",
          height: "90%",
          width: "80%",
          paddingLeft: 10,
        }}
      >
        <Text
          style={{
            ...H1,
            fontSize: 10,
            color: COLORS.darkGray,
          }}
        >
          Ünite {lesson.id}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...H1,
            fontSize: 14,
            color: COLORS.black,
          }}
        >
          {lesson.NAME}
        </Text>

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "70%",
              borderRadius: 8,
              height: 10,
              flexDirection: "row",
              borderWidth: 1,
              marginRight: 10,
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "#D9D9D9",
            }}
          >
            <View
              style={{
                width: `${(lesson.UPLEVEL / lesson.SUBCOUNT) * 100}%`,
                borderRadius: 8,
                height: "100%",
                backgroundColor: COLORS.lightGreen,
              }}
            />
          </View>
          <Text
            style={{
              ...BODY2,
              fontSize: 12,
              color: COLORS.darkGray,
            }}
          >
            {lesson.UPLEVEL}/{lesson.SUBCOUNT}
          </Text>
        </View>
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

export default unitListComp;
