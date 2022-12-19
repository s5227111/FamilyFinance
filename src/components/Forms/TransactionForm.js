import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import CurrencyInput from "react-native-currency-input";
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import colors from "../../design-system/colors";
import { useState } from "react";

const TransactionForm = ({ 
    categorys, setCategory,
    date, setDate,
    value, setValue,
    title,
    handleSubmit,
}) => {
    const [show, setShow] = useState(false);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{title}</Text>
            
            {/* Category */}
            <View style={styles.item}>
            <Text style={styles.labelText}>Category:</Text>
            <SelectDropdown
                styles={styles.dropdown}
                data={categorys}
                onSelect={(selectedItem, index) => {
                    setCategory(selectedItem);
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

            {/* DATE */}
            <View style={styles.item}>
            <Text style={styles.labelText}>Date:</Text>
            <TouchableOpacity style={styles.date} onPress={() => setShow(true)}>
                <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
            { show && (
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

            {/*  VALUE */}
            <View style={styles.item}>
            <Text style={styles.labelText}>Amount:</Text>
            <CurrencyInput
                value={value}
                style={styles.input}
                onChangeValue={setValue}
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
    );
}


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
      backgroundColor: colors.primary,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    textButton: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default TransactionForm;