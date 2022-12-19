import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import CurrencyInput from "react-native-currency-input";
import { handleCreateTransaction } from "../services/transactionService";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const Incomes = () => {
  const [income, setIncome] = useState(0);
  const [incomeType, setIncomeType] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

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
      <View style={styles.container}>

        <Text style={styles.title}>Register a income</Text>

        {/* INCOME TYPE */}
        <View style={styles.item}>
          <Text style={styles.labelText}>Income:</Text>
          <SelectDropdown
            styles={styles.dropdown}
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
        </View>

        {/* INCOME DATE */}
        <View style={styles.item}>
          <Text style={styles.labelText}>Date:</Text>
          <TouchableOpacity style={styles.date} onPress={() => setShow(true)}>
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
        </View>

        {/* INCOME VALUE */}
        <View style={styles.item}>
          <Text style={styles.labelText}>Amount:</Text>
          <CurrencyInput
            value={income}
            style={styles.input}
            onChangeValue={setIncome}
            prefix="£"
            delimiter=","
            separator="."
            precision={2}
            minValue={0}
            showPositiveSign={false}
          />
        </View>


        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.textButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "50%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  dropdown: {
    width: "50%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  date: {
    width: "50%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#000",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Incomes;