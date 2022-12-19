import { useState, useContext } from "react";
import { handleCreateTransaction } from "../services/transactionService";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import TransactionForm from "../components/Forms/TransactionForm";
import UserContext from '../context/userContext';

const Expenses = () => {
  const [expenseValue, setExpenseValue] = useState(0);
  const [expenseType, setExpenseType] = useState("");
  const [date, setDate] = useState(new Date());
  const { user, setUser } = useContext(UserContext);

  // Isa = Individual Savings Account
  const categoryTypes = ["Food", "Transport", "Education", "Others"];

  /**
   * Handle submit form
   * @returns {Promise<void>}
   * @private
   * @memberof Expenses
   * @method handleSubmit
   */
  const handleSubmit = async () => {
    try {
      let expenseData = {
        type: "expense",
        category: expenseType,
        date: date,
        value: expenseValue,
      };

      await handleCreateTransaction(expenseData, user);

      // Show success toast
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Expense added successfully",
      });

      // Reset form
      setExpenseValue(0);
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
    <AlertNotificationRoot>
      <TransactionForm
        title="Register a expense"
        categorys={categoryTypes}
        setCategory={setExpenseType}
        date={date}
        setDate={setDate}
        value={expenseValue}
        setValue={setExpenseValue}
        handleSubmit={handleSubmit}
      />
    </AlertNotificationRoot>
  );
};

export default Expenses;
