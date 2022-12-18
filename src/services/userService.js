import submitApi from "../config/submitApi";

export const handleLogin = async (email, password) => {
  const response = await submitApi("users/login", "POST", {
    email: email,
    password: password,
  });

  return response;
};
