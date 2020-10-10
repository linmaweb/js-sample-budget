import uuidv4 from "uuid/v4";
import {
  balance,
  money_plus,
  money_minus,
  list,
  text,
  amount,
  history,
} from "./variables";

let transactions =
  localStorage.getItem("transactions") !== null ? 
  JSON.parse(localStorage.getItem("transactions")) : 
  [];

const addTransaction = (e) => {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: uuidv4(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
};

const addTransactionDOM = (transaction) => {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}${Math.abs(transaction.amount)}</span> 
    <button class="delete-btn" id="${transaction.id}">x</button>
  `;
  list.appendChild(item);
};

const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1
    )
    .toFixed(2);
  const delete_btns = document.querySelectorAll(".delete-btn");
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
  delete_btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      removeTransaction(this.id);
    });
  });
  history.style.display = total == 0 ? "none" : "block";
};

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
};

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const init = () => {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
};

export { init, addTransaction };
