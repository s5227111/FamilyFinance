import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Set user local
 * @returns
 * @description Set user local
 * @returns {Promise<void>}
 */
export const setUserLocal = async (user) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
        console.log(e);
    }
};

export const getUserLocal = async () => {
    try {
        const user = await AsyncStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.log(e);
    }
}
