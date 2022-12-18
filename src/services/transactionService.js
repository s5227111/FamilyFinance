export const handleTransaction = async (transaction) => {
  const { value, category, type, date } = transaction;

  if (!value || !category || !type || !date) {
    throw new Error("Please fill all the fields");
  }

  return true;

  // const { data } = await axios.post(
  //     `${process.env.REACT_APP_API_URL}/transactions`,
  //     transaction
  // );
  // return data;
};
