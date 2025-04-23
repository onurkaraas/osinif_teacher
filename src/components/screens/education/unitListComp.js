import { Text, TouchableOpacity, View } from "react-native";
import {
  BODY2,
  BODY3,
  COLORS,
  H1,
  SHADOWS,
  SIZES,
} from "../../../constants/theme";
import { Icon } from "@rneui/base";
import ChapterList from "./lists/ChapterList";
import React from "react";

const unitListComp = ({
  lesson,
  setSelectedLesson,
  setChapterList,
  isSelected,
  setIsSelected,
  chapterList,
  selectedChapter,
}) => {
  console.log(chapterList, lesson, "LESSSSON");
  return (
    <View>
      <TouchableOpacity
        key={lesson?.ID}
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
            Ünite {lesson?.ID}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...H1,
              fontSize: 14,
              color: COLORS.black,
            }}
          >
            {lesson?.NAME}
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
    </View>
  );
};

export default unitListComp;
