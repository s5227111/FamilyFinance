import { useContext, useState } from "react";
import { handleCreateTransaction } from "../services/transactionService";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import TransactionForm from "../components/Forms/TransactionForm";
import UserContext from '../context/userContext';


const Incomes = () => {
  const [income, setIncome] = useState(0);
  const [incomeType, setIncomeType] = useState("");
  const [date, setDate] = useState(new Date());
  const { user, setUser } = useContext(UserContext);

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
      await handleCreateTransaction(incomeData, user);

      // Show success toast
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Income added successfully",
      });

      // Reset form
      setIncome(0);
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
