import Accordion from "react-native-collapsible/Accordion";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { Icon } from "@rneui/base";

const faqAccordion = ({ SECTIONS }) => {
  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{
            ...FONTS.H3,
            fontSize: 16,
            color: COLORS.darkGray,
            textAlign: "center",
            paddingVertical: SIZES.base,
            paddingHorizontal: SIZES.base,
          }}
        >
          {section.title}
        </Text>
        <Icon
          color={COLORS.darkGray}
          size={22}
          type={"feather"}
          name={"chevron-down"}
        />
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text
          style={{
            ...FONTS.BODY3,
            color: COLORS.softBlack,
            paddingHorizontal: SIZES.base,
            width: SIZES.width * 0.85,
          }}
        >
          {section.content}
        </Text>
      </View>
    );
  };

  const updateSection = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      underlayColor={COLORS.primary}
      sections={SECTIONS}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={updateSection}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#fff",
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.base,
    width: SIZES.width * 0.9,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  headerText: {
    ...FONTS.H3,
    fontSize: 18,
    color: COLORS.darkGray,
    textAlign: "center",
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#F3F6F9",
    marginBottom: 8,
    height: 56,
    backfaceVisibility: "hidden",
    borderRadius: SIZES.radius,
    width: SIZES.width * 0.9,
    alignItems: "center",
    paddingHorizontal: SIZES.base,
    justifyContent: "space-between",
  },
  contentText: {
    ...FONTS.BODY3,
    color: COLORS.softBlack,
    width: SIZES.width * 0.85,
  },
});
export default faqAccordion;
