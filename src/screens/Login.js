import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import colors from '../design-system/colors';
import { handleLogin } from '../services/userService';
import UserContext from '../context/userContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {user, setUser} = useContext(UserContext);

    const navigation = useNavigation();
    
    const handleLoginUser = async () => {
        setLoading(true);
        try {
            const response = await handleLogin(email, password);
            await setUser(response);
            navigation.navigate('Home')

        } catch (e) {
            setError(e.message);
        }
         
        setLoading(false);
    };
    
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Family Finance</Text>
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
        <Pressable style={styles.button} onPress={handleLoginUser}>
            <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable style={{marginBottom: 10}} onPress={() => navigation.navigate('Register')}>
            <Text style={{color: colors.primary}}>
                Don't have a registration? sign up for free
            </Text>
        </Pressable>

        {loading && <Text>Loading...</Text>}
        {error && 
            <Text style={{ color: colors.danger }}>
                {error}
            </Text>
        }
        </View>
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
});

export default Login;