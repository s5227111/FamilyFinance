import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUser = async (user) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.log(e);
  }
};
