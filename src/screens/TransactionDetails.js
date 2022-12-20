import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../design-system/colors";
import { useNavigation, useRoute } from '@react-navigation/native';
import { handleDeleteTransaction } from "../services/transactionService";
import { AlertNotificationRoot, ALERT_TYPE, Toast } from "react-native-alert-notification";

const TransactionDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const transaction = route.params.transaction;

    /**
     * Handle delete transaction
     * @returns
     * @memberof TransactionDetails
     * @description Handle delete transaction
     * @returns {Promise<void>}
     * @param {string} id
     * @returns {Promise<void>}
     * @memberof TransactionDetails
     */
    const handleDeleteTransactionAction = async () => {
        try {
            await handleDeleteTransaction(transaction.id);
            navigation.goBack();
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.ERROR,
                title: "Error",
                textBody: "Error to delete transaction",
            });

            console.log(error.message);
        }
    };

    return (
        <AlertNotificationRoot>
            <View style={styles.container}>
                <Text style={styles.title}>Transaction Details</Text>
                {transaction.type === 0 ? (
                    <Text style={[styles.text, { color: colors.danger }]}>Type: Expense</Text>
                ) : (
                    <Text style={[styles.text, { color: colors.link }]}>Type: Income</Text>
                )}
                <Text style={styles.text}>Amount: {parseFloat(transaction.amount).toFixed(2)}</Text>
                <Text style={styles.text}>Date: {new Date(transaction.date).toDateString()}</Text>
                <Text style={styles.text}>Category: {transaction.category}</Text>
            </View>
            <View style={styles.divBtnClose}>
                <Pressable style={styles.btnClose} onPress={() => navigation.goBack()}>
                    <Text style={styles.textBtn}>Close</Text>
                </Pressable>

                <Pressable style={styles.btnDelete} onPress={handleDeleteTransactionAction}>
                    <Text style={styles.textBtnDelete}>Delete Transaction</Text>
                </Pressable>
            </View>
        </ AlertNotificationRoot>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.secondary,
        paddingBottom: 20,
    },
    text: {
        fontSize: 18,
        color: colors.secondary,
    },
    divBtnClose: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 200,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    btnClose: {
        width: 200,
        height: 50,
        backgroundColor: colors.secondary,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    textBtn: {
        fontSize: 18,
        color: colors.primary,
        fontWeight: "bold",
    },

    btnDelete: {
        width: 200,
        height: 50,
        backgroundColor: colors.danger,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    textBtnDelete: {
        fontSize: 18,
        color: colors.white,
        fontWeight: "bold",
    },

});

export default TransactionDetails;