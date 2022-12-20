import { PieChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";

const PieCharts = ({ data, nameValue }) => {

  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const screenWidth = Dimensions.get("window").width - 18;

  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={nameValue}
        backgroundColor={"transparent"}
        absolute
      />
    </View>
  );
  ;
}

export default PieCharts;