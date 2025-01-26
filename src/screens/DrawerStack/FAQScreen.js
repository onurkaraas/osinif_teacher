import { View, Text, ScrollView } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import Accordion from "react-native-collapsible/Accordion";
import faqAccordion from "../../components/accordion/faqAccordion";
import DrawerScreensTitle from "../../components/drawer/drawerScreensTitle";

const FAQScreen = () => {
  const SECTIONS = [
    {
      title: "oSınıf nedir?",
      content: "Lorem ipsum...",
    },
    {
      title: "oSınıf nasıl kullanılır?",
      content: "Lorem ipsum...",
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: COLORS.primary,
      }}
    >
      <DrawerScreensTitle
        style={{
          paddingLeft: 0,
        }}
        title={"Sıkça Sorulan Sorular"}
      />

      <Text
        style={{
          ...FONTS.H3,
          fontSize: 14,
          color: COLORS.black,
          textAlign: "center",
        }}
      >
        oSınıf hakkında daha detaylı bilgi almak için aşağıdaki sorulara
        bakabilirsin.
      </Text>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingTop: 20,
        }}
      >
        {faqAccordion({
          SECTIONS,
        })}
      </ScrollView>
    </View>
  );
};

export default FAQScreen;
