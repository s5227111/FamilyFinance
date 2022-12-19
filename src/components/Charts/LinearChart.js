import { LineChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import colors from "../../design-system/colors";

const LinearChart = ({ labels, data }) => {
    return (
        <View>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                        },
                    ],
                }}
                width={Dimensions.get("window").width - 18} // from react-native
                height={220}
                yAxisLabel="£"
                chartConfig={{
                    backgroundColor: colors.primary,
                    backgroundGradientFrom: colors.primary,
                    backgroundGradientTo: colors.link,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: colors.link,
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
}

export default LinearChart;