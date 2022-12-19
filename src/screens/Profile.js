import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Pressable,
} from "react-native";
import {
    AlertNotificationRoot,
    ALERT_TYPE,
    Toast,
} from "react-native-alert-notification";
import colors from "../design-system/colors";
import { handleUpdateUser } from "../services/userService";
import { getUser } from "../storage/userStorage";
import { setUser } from "../storage/userStorage";

const Profile = () => {
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            const user = await getUser();
            setId(user.id);
            setEmail(user.email);
            setName(user.name);
            setPassword(user.password);
        };

        loadUser();
    }, []);

    const navigation = useNavigation();

    const handleUpdateProfile = async () => {
        setLoading(true);
        try {
            const response = await handleUpdateUser({ name, email, password, id });

            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Success",
                message: "User updated successfully",
            });

            await setUser(response);

        } catch (error) {

            console.log(error);

            Toast.show({
                type: ALERT_TYPE.ERROR,
                title: "Error",
                message: "Error updating user",
            });
        }

        setLoading(false);
    };

    return (
        <AlertNotificationRoot>
            <View style={styles.container}>
                <Text style={styles.title}>Profile Details</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Pressable style={styles.button} onPress={handleUpdateProfile}>
                    <Text style={styles.buttonText}>Update</Text>
                </Pressable>

                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </View>
        </AlertNotificationRoot>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    button: {
        marginBottom: 16,
        backgroundColor: colors.primary,
        color: colors.white,
        width: 200,
        padding: 8,
    },

    buttonText: {
        color: colors.white,
        textAlign: "center",
    },
});

export default Profile;
