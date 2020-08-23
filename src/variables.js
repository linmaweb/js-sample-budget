const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const history = document.getElementById("history");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

export {
  balance,
  money_plus,
  money_minus,
  list,
  form,
  text,
  amount,
  history,
  localStorageTransactions,
};
