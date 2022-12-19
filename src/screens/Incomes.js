import { useState } from "react";
import { handleCreateTransaction } from "../services/transactionService";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import TransactionForm from "../components/Forms/TransactionForm";


const Incomes = () => {
  const [income, setIncome] = useState(0);
  const [incomeType, setIncomeType] = useState("");
  const [date, setDate] = useState(new Date());

  // Isa = Individual Savings Account
  const incomeTypes = ["Salary", "Gift", "Isa", "Others"];

  /**
   * Handle submit form
   * @returns {Promise<void>}
   * @private
   * @memberof Incomes
   * @method handleSubmit
   */
  const handleSubmit = async () => {
    try {
      let incomeData = {
        type: "income",
        category: incomeType,
        date: date,
        value: income,
      };
      await handleCreateTransaction(incomeData);

      // Show success toast
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Income added successfully",
      });

      // Reset form
      setIncome(0);
      setIncomeType("");
      setDate(new Date());

    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.ERROR,
        title: "Error",
        textBody: error.message,
      });
    }
  };

  return (
    <AlertNotificationRoot theme="dark">
      <TransactionForm
        title="Register a income"
        categorys={incomeTypes}
        setCategory={setIncomeType}
        date={date}
        setDate={setDate}
        value={income}
        setValue={setIncome}
        handleSubmit={handleSubmit}
      />
    </AlertNotificationRoot>
  );
};



export default Incomes;