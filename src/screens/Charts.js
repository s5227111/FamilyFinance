import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { monthsValeu } from "../config/months";
import LinearChart from "../components/Charts/LinearChart";
import PieCharts from "../components/Charts/PieCharts";
import colors from "../design-system/colors";
import { handleGetChartToCategory, handleGetChartToMonth } from "../services/chartService";

const Charts = () => {
    const [chartValue, setChartValue] = useState([]);
    const [chartLabel, setChartLabel] = useState([]);
    const [charCategory, setCharCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Get the chart data
     * @returns
     * @memberof Charts
     * @description Get the chart data
     * @returns {Promise<void>}
     */
    const getChart = async () => {

        // get the chart data
        let valueChartresponseChart = await handleGetChartToMonth();
        let valueChart = monthsValeu;

        // for each month, set the value
        await valueChartresponseChart.forEach((item) => {
            valueChart[parseInt(item.month) - 1].value = item.total;
        });

        // get the chart labels and data
        let labels = Object.keys(valueChart).map((item) => valueChart[item].month);
        let data = Object.keys(valueChart).map((item) => valueChart[item].value);

        // get the current month 
        let monthToday = new Date().getMonth();

        // get the last 5 months
        if (monthToday <= 5) {
            labels = labels.slice(0, 6);
            data = data.slice(0, 6);
        } else {
            labels = labels.slice(monthToday - 5, monthToday + 1);
            data = data.slice(monthToday - 5, monthToday + 1);
        }

        // get the chart data category
        let valueChartresponseCategory = await handleGetChartToCategory();
        let valueCategoryWithColor = await valueChartresponseCategory.map((item) => {
            return {
                ...item,
                amount: parseFloat(parseFloat(item.total).toFixed(2)),
                name: item.category,
                color: colors.category[(item.category).toLowerCase()],
                legendFontColor: colors.text,
                legendFontSize: 15
            };
        });


        console.log(valueCategoryWithColor);

        // set the chart data category with color
        setCharCategory(valueCategoryWithColor);

        // set the chart data and labels
        setChartValue(data);
        setChartLabel(labels);

        // set loading to false
        setLoading(false);
    }

    useEffect(() => {
        getChart();
    }, []);

    return (
        <View style={styles.container}>
            {loading === false &&
                <>
                    <Text style={styles.title}>Icomes to month</Text>
                    <LinearChart
                        data={chartValue}
                        labels={chartLabel}
                    />

                    {charCategory.length > 0 &&
                        <>
                            <Text style={styles.title}>Expense to category</Text>
                            <PieCharts
                                data={charCategory}
                                nameValue="amount"
                            />
                        </>
                    }
                </>
            }

            <TouchableOpacity onPress={() => getChart()}>
                <Text>Reload</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        // justifyContent: 'center',
        padding: 5,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
});

export default Charts;