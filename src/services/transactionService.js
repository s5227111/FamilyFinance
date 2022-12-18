import submitApi from "../config/submitApi";

export const handleCreateTransaction = async (transaction) => {
  const { value, category, type, date } = transaction;

  if (!value || !category || !type || !date) {
    throw new Error("Please fill all the fields");
  }

  const response = await submitApi("transactions/create", "POST", {
    amount: value,
    category: category,
    date: date,
    type: type === "income" ? 1 : 0,
    user_id: 1,
  });

  return response;
};
export const handleGetTransactions = async () => {
  const response = await submitApi("transactions", "GET");
  return response;
}

export const handleGetTransactionById = async (id) => {
  const response = await submitApi(transactions/${id}, "GET");
  return response;
}

export const handleUpdateTransaction = async (transaction) => {
  const { id, value, category, type, date } = transaction;

  if (!id) {
    throw new Error("Please fill all the fields");
  }

  const response = await submitApi(`transactions/${id}`, "POST", {
    "amount": value,
    "category": category,
    "date": date,
    "type": type === "income" ? 1 : 0
  });

  return response;
}

export const handleDeleteTransaction = async (id) => {
  const response = await submitApi(`transactions/${id}`, "DELETE");
  return response;
}