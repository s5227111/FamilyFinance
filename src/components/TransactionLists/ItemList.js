import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../design-system/colors";
import { useNavigation } from "@react-navigation/native";

const ItemList = ({ item }) => {

    const navigation = useNavigation();

    let data = new Date(item.date);
    let styleType = styles.expenseType

    if (item.type) {
        styleType = styles.IncomeType
    }

    const handleClick = () => {
        console.log(item);
        navigation.navigate('TransactionDetails', { transaction: item });
    }

    return (
        <TouchableOpacity onPress={handleClick} style={styles.itemContainer}>
            <View style={styles.itemLeft}>
                <Text style={styles.itemTitle}>{item.category}</Text>
                <Text style={styles.itemDate}>{item.user.name}</Text>
                <Text style={styles.itemDate}>{data.toDateString()}</Text>
            </View>
            <View style={styles.itemRight}>
                <Text style={[styles.itemAmount, styleType]}>{item.amount}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        width: 330,
    },
    expenseType: {
        color: colors.danger,
    },

    IncomeType: {
        color: colors.success,
    },

    itemLeft: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemRight: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemDate: {
        fontSize: 12,
        color: '#888',
    },
    itemAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ItemList;