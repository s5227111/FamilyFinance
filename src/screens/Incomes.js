import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import CurrencyInput from "react-native-currency-input";
import { handleCreateTransaction } from "../services/transactionService";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import RNDateTimePicker, {
  DateTimePickeriOS,
} from "@react-native-community/datetimepicker";

const Incomes = () => {
  const [income, setIncome] = useState(0);
  const [incomeType, setIncomeType] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // Isa = Individual Savings Account
  const incomeTypes = ["Salary", "Gift", "Isa", "Others"];

  const handleSubmit = async () => {
    console.log("income", income);
    try {
      let incomeData = {
        type: "income",
        category: incomeType,
        date: date,
        value: income,
      };
      await handleCreateTransaction(incomeData);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Income added successfully",
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.ERROR,
        title: "Error",
        textBody: error.message,
      });
      console.log(error);
    }
  };

  return (
    <AlertNotificationRoot theme="dark">
      <View>
        {/* INCOME TYPE */}
        <Text>Income:</Text>
        <SelectDropdown
          data={incomeTypes}
          onSelect={(selectedItem, index) => {
            setIncomeType(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />

        {/* INCOME DATE */}
        <Text>Date:</Text>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        {show && (
          <RNDateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setDate(currentDate);
              setShow(false);
            }}
            locale="pt-BR"
          />
        )}

        {/* INCOME VALUE */}
        <Text>Amount:</Text>
        <CurrencyInput
          value={income}
          onChangeValue={setIncome}
          prefix="£"
          delimiter=","
          separator="."
          precision={2}
          minValue={0}
          showPositiveSign={false}
          onChangeText={(formattedValue) => {
            console.log(formattedValue); // £ 2,310.46
          }}
        />
        <TouchableOpacity onPress={() => handleSubmit()}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </AlertNotificationRoot>
  );
};

export default Incomes;
