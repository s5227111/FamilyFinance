import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import LinearChart from "../components/Charts/LinearChart";
import ContentList from "../components/TransactionLists/ContentList";
import InformationCard from "../components/Cards/InformationCard";
import { handleGetTransactions } from "../services/transactionService";

const Home = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getAllTransactions = async () => {
      const response = await handleGetTransactions();
      setTransactions(response);
    }

    getAllTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <LinearChart />
      <InformationCard />
      <ContentList
        data={transactions}
      />
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