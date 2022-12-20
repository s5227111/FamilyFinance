import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Pressable } from 'react-native';
import { AlertNotificationRoot, ALERT_TYPE, Toast } from 'react-native-alert-notification';
import colors from '../design-system/colors';
import { handleUpdateUser } from '../services/userService';
import UserContext from '../context/userContext';
import { setUserLocal } from "../storage/userStorage";

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [id, setId] = useState(user.id);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [name, setName] = useState(user.name);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const loadUser = async () => {
            setId(user.id);
            setEmail(user.email);
            setName(user.name);
            setPassword(user.password);
        }

        loadUser();
    }, [user]);

    const navigation = useNavigation();

    /**
     * Handle update user
     * @returns
     * @memberof Profile
     * @description Handle update user
     * @returns {Promise<void>}
     * @param {string} name
     * @param {string} email
     * @param {string} password
     * @param {string} id
     * @returns {Promise<void>}
     * @memberof Profile
     */
    const handlerUpdateProfile = async () => {
        setLoading(true);

        try {
            const response = await handleUpdateUser({
                name,
                email,
                password,
                id
            });

            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Success",
                textBody: "User updated successfully",
            });

            await setUserLocal(response);
            await setUser(response);

        } catch (error) {
            console.log(error);

            Toast.show({
                type: ALERT_TYPE.ERROR,
                title: "Error",
                textBody: error.message,
            });
        }

        setLoading(false);
    };

    const handlerLogout = async () => {
        await setUserLocal(null);
        navigation.navigate('Login');
    };

    return (
        <AlertNotificationRoot>
            <View style={styles.container}>
                <Text style={styles.title}>Hi! {name}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    autoCapitalize='none'
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    autoCapitalize='none'
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize='none'
                    secureTextEntry
                />

                <Pressable style={styles.button} onPress={handlerUpdateProfile}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>

                {loading && <ActivityIndicator size="large" color="#0000ff" />}


                <Pressable style={styles.buttonLogout} onPress={handlerLogout}>
                    <AntDesign name="logout" color={colors.danger} size={20} />
                    <Text style={styles.buttonTextLogout}>Logout</Text>
                </Pressable>
            </View>
        </AlertNotificationRoot>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
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
        textAlign: 'center',
    },

    buttonLogout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        backgroundColor: 'transparent',
        color: colors.white,
        width: 200,
        padding: 8,
        marginTop: 26,
    },

    buttonTextLogout: {
        color: colors.danger,
        textAlign: 'center',
        marginLeft: 8,
    },
});

export default Profile;