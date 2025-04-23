import React from "react";
import { View, Text, FlatList } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";
import PurchasedListComp from "../purchasedListComp";

const PurchasedList = ({ data, setUnitList, setSelectedLesson }) => {
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
  return data.map((group, index) => (
    <View key={index}>
      <Text
        style={{
          width: SIZES.width,
          paddingLeft: 10,
          ...FONTS.H3,
          backgroundColor: COLORS.green,
          marginBottom: 10,
          color: COLORS.white,
        }}
      >
        {parseInt(group[0]?.VIDEOLEVEL) + 4}. Sınıf
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 10,
          justifyContent: "space-between",
        }}
        numColumns={2}
        scrollEnabled={false}
        estimatedItemSize={100}
        initialNumToRender={20}
        windowSize={50}
        data={group}
        keyExtractor={(item) => item?.PRODUCTCODE ?? item?.ID}
        renderItem={({ item, index }) => (
          <PurchasedListComp
            setUnitList={setUnitList}
            setSelected={setSelectedLesson}
            item={item}
          />
        )}
      />
    </View>
  ));
};
export default PurchasedList;
