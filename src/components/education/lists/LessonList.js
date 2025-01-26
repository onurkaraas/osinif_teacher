import React from "react";
import { View, Text } from "react-native";
import { FONTS, SIZES } from "../../../constants/theme";
import { FlashList } from "@shopify/flash-list";
import LessonListComp from "../lessonListComp";

const LessonList = ({ data, setUnitList, setSelectedLesson }) => {
  if (!data || data.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: SIZES.height * 0.1,
        }}
      >
        <Text
          style={{
            ...FONTS.BODY1,
            fontSize: 16,
          }}
        >
          Ders bulunamadı.
        </Text>
      </View>
    );
  }
  return (
    <FlashList
      contentContainerStyle={{
        paddingBottom: 125,
      }}
      estimatedItemSize={100}
      initialNumToRender={20}
      windowSize={50}
      data={data}
      keyExtractor={(item) => item?.PRODUCTCODE ?? item?.ID}
      renderItem={({ item, index }) => (
        <LessonListComp
          setUnitList={setUnitList}
          setSelectedLesson={setSelectedLesson}
          lesson={item}
        />
      )}
    />
  );
};
export default LessonList;
