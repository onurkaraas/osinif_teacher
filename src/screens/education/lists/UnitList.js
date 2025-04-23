import React from "react";
import { View, Text, FlatList } from "react-native";
import { FONTS, SIZES } from "../../../../constants/theme";
import { FlashList } from "@shopify/flash-list";
import UnitListComp from "../unitListComp";

const UnitList = ({
  chapterList,
  setSelectedChapter,
  data,
  setChapterList,
  setSelectedUnit,
  selectedChapter,
  selectedUnit,
}) => {
  const [isSelected, setIsSelected] = React.useState(false);
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
    <FlatList
      estimatedItemSize={100}
      initialNumToRender={20}
      windowSize={50}
      contentContainerStyle={{
        paddingBottom: 125,
      }}
      extraData={chapterList}
      data={data}
      keyExtractor={(item) => item?.ID}
      renderItem={({ item, index }) => (
        <UnitListComp
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          chapterList={chapterList}
          setSelectedChapter={setSelectedChapter}
          setChapterList={setChapterList}
          selectedChapter={selectedChapter}
          selectedUnit={selectedUnit}
          setSelectedLesson={setSelectedUnit}
          lesson={item}
        />
      )}
    />
  );
};
export default UnitList;
