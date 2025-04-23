import { Text, View } from "react-native";
import { BODY2, COLORS, H3, SHADOWS, SIZES } from "../../../constants/theme";
import PieChart from "react-native-pie-chart";

const GraphComp = (item) => {
  const data = item.item;
  const sliceColor = (data) => {
    if (data.NAME === "TOPLAM ÇÖZÜLEN SORU") {
      return [COLORS.darkBlue, COLORS.purple, COLORS.gray];
    } else {
      return [COLORS.darkBlue, COLORS.purple];
    }
  };
  const series = (data) => {
    if (data.NAME === "TOPLAM ÇÖZÜLEN SORU") {
      return [
        data?.SUB_1 === 0 && data?.SUB_2 === 0 ? 1 : data?.SUB_1,
        data?.SUB_2 === 0 && data?.SUB_1 === 0 ? 1 : data?.SUB_2,
        data?.SUB_3 === 0 && data?.SUB_2 && (data?.SUB_1 === 0) === 0
          ? 1
          : data?.SUB_3,
      ];
    } else if (data.NAME === "SITEDE GEÇIRILEN SÜRE") {
      return [data?.COUNT === 0 ? 1 : data?.COUNT, 1];
    } else if (data.NAME === "TOPLAM IZLENEN VIDEO") {
      return [data?.COUNT === 0 ? 1 : data?.COUNT, data?.SUB_1 - data?.COUNT];
    } else {
      return [
        data?.SUB_1 === 0 && data?.SUB_2 === 0 ? 1 : data?.SUB_1,
        data?.SUB_2 === 0 && data?.SUB_1 === 0 ? 1 : data?.SUB_2,
      ];
    }
  };
  if (data?.SUB_1 !== undefined && data?.SUB_2 !== undefined) {
    return (
      <View
        style={{
          marginTop: 20,
          ...SHADOWS.shadowOne,
          height: 250,
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            width: "100%",
            borderBottomWidth: 2,
            borderBottomColor: COLORS.lightGrayFour,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...H3,
              paddingVertical: 8,
              fontSize: 16,
              color: COLORS.darkGray,
            }}
          >
            {data.NAME}
          </Text>
        </View>
        <View
          style={{
            width: "80%",
            height: "82.5%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <PieChart
            widthAndHeight={150}
            series={series(data)}
            sliceColor={sliceColor(data)}
            coverRadius={0.45}
            coverFill={"#FFF"}
          />
          <View
            style={{
              flexDirection: "row",
              width: 350,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 15,
                  height: 7.5,
                  marginRight: 5,
                  backgroundColor:
                    data?.NAME === "SITEDE GEÇIRILEN SÜRE"
                      ? COLORS.purple
                      : COLORS.darkBlue,
                }}
              />
              <Text
                style={{
                  ...BODY2,
                  fontSize: 12,
                  color: "#4F4F4F",
                }}
              >
                {data?.NAME === "SITEDE GEÇIRILEN SÜRE"
                  ? "Süre"
                  : data?.NAME === "TOPLAM ÇÖZÜLEN SORU"
                    ? "Yanlış"
                    : data?.NAME === "TOPLAM IZLENEN VIDEO"
                      ? "İzlenen Video"
                      : data?.NAME === "TEST VE SINAVLAR"
                        ? "Tamamlanan Testler"
                        : data?.NAME === "SINAV ISTATISTIKLERI"
                          ? "Kalan Sınav"
                          : "Tamamlanan ödev"}
                (
                {data?.NAME === "SITEDE GEÇIRILEN SÜRE" ||
                data?.NAME === "TOPLAM IZLENEN VIDEO"
                  ? data.COUNT
                  : data?.SUB_1}
                )
              </Text>
            </View>
            {data?.NAME !== "SITEDE GEÇIRILEN SÜRE" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 7.5,
                    marginRight: 5,
                    backgroundColor: COLORS.purple,
                  }}
                />
                <Text
                  style={{
                    ...BODY2,

                    fontSize: 12,
                    color: "#4F4F4F",
                  }}
                >
                  {data?.NAME === "TOPLAM ÇÖZÜLEN SORU"
                    ? "Doğru"
                    : data?.NAME === "TOPLAM IZLENEN VIDEO"
                      ? "Kalan Video"
                      : data?.NAME === "TEST VE SINAVLAR"
                        ? "Kalan Testler"
                        : data?.NAME === "SINAV ISTATISTIKLERI"
                          ? "Girilen Sinav"
                          : "Kalan ödev"}
                  (
                  {data?.NAME === "TOPLAM IZLENEN VIDEO"
                    ? data?.SUB_1 - data?.COUNT
                    : data?.SUB_2}
                  )
                </Text>
              </View>
            )}
          </View>
          {data?.NAME === "TOPLAM ÇÖZÜLEN SORU" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 15,
                  height: 7.5,
                  marginRight: 5,
                  backgroundColor: COLORS.gray,
                }}
              />
              <Text
                style={{
                  ...BODY2,
                  fontSize: 12,
                  color: "#4F4F4F",
                }}
              >
                {data?.NAME === "TOPLAM ÇÖZÜLEN SORU" && "Boş"}({data?.SUB_2})
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
};

export default GraphComp;
