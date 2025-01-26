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
import intToMinutes from "../../helpers/intToMinutes";

const questionListComp = ({
  question,
  setQuestionModalType,
  index,
  setQuestionModalVisible,
  setSelectedQuestion,
}) => {
  return (
    <TouchableOpacity
      key={question.CODE}
      onPress={() => {
        setQuestionModalVisible(true);
        setSelectedQuestion(question);
        setQuestionModalType("question");
      }}
      style={{
        backfaceVisibility: "hidden",
        flexDirection: "row",
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
          justifyContent: "center",
          height: "90%",
          width: "80%",
          paddingLeft: 10,
        }}
      >
        {/*<Text*/}
        {/*  style={{*/}
        {/*    ...H1,*/}
        {/*    fontSize: 12,*/}
        {/*    color: COLORS.darkGray,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Bölüm {question.id}*/}
        {/*</Text>*/}
        <Text
          numberOfLines={1}
          style={{
            ...H1,
            fontSize: 16,
            color: COLORS.black,
          }}
        >
          Örnek Soru {index + 1}
        </Text>
        {/*<View*/}
        {/*  style={{*/}
        {/*    width: "100%",*/}
        {/*    flexDirection: "row",*/}
        {/*    justifyContent: "space-between",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Text*/}
        {/*    style={{*/}
        {/*      textAlign: "right",*/}
        {/*      ...BODY2,*/}
        {/*      fontSize: 12,*/}
        {/*      color: COLORS.darkGray,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {question.explanation}*/}
        {/*  </Text>*/}
        {/*  <Text*/}
        {/*    style={{*/}
        {/*      textAlign: "right",*/}
        {/*      ...BODY2,*/}
        {/*      fontSize: 12,*/}
        {/*      color: COLORS.darkGray,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    /!*{intToMinutes(question.DURATION)}*!/*/}
        {/*  </Text>*/}
        {/*</View>*/}
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

export default questionListComp;
