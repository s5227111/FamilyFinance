import submitApi from "../config/submitApi";

/**
 * Get the chart data
 * @returns
 * @memberof Charts
 * @description Get the chart data
 * @returns {Promise<void>}
 * @param {string} url
 * @param {string} method
 * @returns {Promise<void>}
 * @memberof Charts
 */
export const handleCreateTransaction = async (transaction, user) => {
  const { value, category, type, date } = transaction;

  if (!value || !category || !type || !date) {
    throw new Error("Please fill all the fields");
  }

  const response = await submitApi("transactions/create", "POST", {
    "amount": value,
    "category": category,
    "date": date,
    "type": type === "income" ? 1 : 0,
    "user_id": user.id
  });

  return response;
};

export const handleGetTransactions = async () => {
  const response = await submitApi("transactions", "GET");
  return response;
}

export const handleGetTransactionById = async (id) => {
  const response = await submitApi(`transactions/${id}`, "GET");
  return response;
}

export const handleUpdateTransaction = async (transaction) => {
  const { id, value, category, type, date } = transaction;

  if (!id) {
    throw new Error("Please provide a valid transaction id");
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
  const response = await submitApi(`transactions/delete/${id}`, "GET");
  return response;
}

export const handleValueExpenseAndIncome = async () => {
  const response = await handleGetTransactions();

  // Get the total expense and income
  let expense = response.filter((transaction) => transaction.type == 0).reduce((acc, transaction) => acc + transaction.amount, 0);
  let income = response.filter((transaction) => transaction.type == 1).reduce((acc, transaction) => acc + transaction.amount, 0);


  return {
    expense,
    income
  };
}