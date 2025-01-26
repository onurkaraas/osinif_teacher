import React from "react";
import { View, Text } from "react-native";
import { FONTS, SIZES } from "../../../constants/theme";
import { FlashList } from "@shopify/flash-list";
import UnitListComp from "../unitListComp";

const UnitList = ({ data, setChapterList, setSelectedUnit }) => {
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
      estimatedItemSize={100}
      initialNumToRender={20}
      windowSize={50}
      contentContainerStyle={{
        paddingBottom: 125,
      }}
      data={data}
      keyExtractor={(item) => item?.ID}
      renderItem={({ item, index }) => (
        <UnitListComp
          setChapterList={setChapterList}
          setSelectedLesson={setSelectedUnit}
          lesson={item}
        />
      )}
    />
  );
};
export default UnitList;
