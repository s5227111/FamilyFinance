import submitApi from "../config/submitApi"

export const handleLogin = async (email, password) => {
    const response = await submitApi("users/login", "POST", {
        "email": email,
        "password": password
    });

    return response;
};

export const handleRegister = async (name, email, password) => {

    if (!name || !email || !password) {
        throw new Error("Please fill all the fields");
    }

    const response = await submitApi("users/register", "POST", {
        "name": name,
        "email": email,
        "password": password
    });

    return response;
}

export const handleUpdateUser = async (user) => {
    const { name, email, password, id } = user;
    const response = await submitApi(`users/update/${id}`, "POST", {
        "name": name,
        "email": email,
        "password": password
    });

    return response;
}