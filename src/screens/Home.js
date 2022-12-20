import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import InformationCard from "../components/Cards/InformationCard";
import ContentList from "../components/TransactionLists/ContentList";
import { handleGetTransactions, handleValueExpenseAndIncome } from "../services/transactionService";
import HomeBanner from "../components/Banner/HomeBanner";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [valueExpense, setValueExpense] = useState(0);
  const [valueIncomes, setValueIncomes] = useState(0);

  /**
   * Get all transactions
   * @returns
   * @memberof Home
   * @description Get all transactions
   * @returns {Promise<void>}
    */
  const getAllTransactions = async () => {

    // get the all transactions 
    const response = await handleGetTransactions();
    setTransactions(response);

    // get the total expense and income
    const responseValues = await handleValueExpenseAndIncome();
    setValueExpense(responseValues.expense.toFixed(2));
    setValueIncomes(responseValues.income.toFixed(2));
  }

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <HomeBanner />
      <InformationCard
        valueIncomes={valueIncomes}
        valueExpense={valueExpense}
      />
      <ContentList data={transactions} />
      <TouchableOpacity onPress={() => getAllTransactions()}>
        <Text>Reload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
    padding: 5,
  },
});

export default Home;
