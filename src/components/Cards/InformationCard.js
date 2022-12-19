import colors from "../../design-system/colors"
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InformationCard = ({ valueIncomes, valueExpense }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.card, styles.cardExpenses]}>
                <Text style={styles.value}>Expenses</Text>
                <Text style={styles.title}>{valueExpense}</Text>
            </View>
            <View style={[styles.card, styles.cardIncomes]}>
                <Text style={styles.value}>Incomes</Text>
                <Text style={styles.title}>{valueIncomes}</Text>
            </View>
        </View>
    )  
}   

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        width: '45%',
        margin: 5,  
        padding: 10,
        borderRadius: 10,
    },
    cardExpenses: {
        backgroundColor: colors.link,
    },
    cardIncomes: {
        backgroundColor: colors.primary,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.white,
    },
    value: {
        fontSize: 10,
        fontWeight: 'light',
        color: colors.white,
        textTransform: 'uppercase',
    },
});

export default InformationCard;