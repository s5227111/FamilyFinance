import { Text, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import CurrencyInput from "react-native-currency-input";
import { useState } from "react";

const Incomes = () => {
  const [income, setIncome] = useState(0);
  const [incomeType, setIncomeType] = useState("");

  // Isa = Individual Savings Account
  const incomeTypes = ["Salary", "Gift", "Isa", "Others"];

  return (
    <View style={{ marginTop: 200 }}>
      <Text>Income:</Text>
      <SelectDropdown
        data={incomeTypes}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
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
      <TouchableOpacity>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Incomes;
