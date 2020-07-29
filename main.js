const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const transactionsFromLS = 
  JSON.parse(localStorage.getItem('transactions'));

let transactions = 
  localStorage.getItem('transactions') !== null 
  ? transactionsFromLS 
  : [];
console.log(transactions);


function generateID(){
  return Math.floor(Math.random()* 1000000);
}

function addTransactionInArray(e){
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('Please add text and amount')
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: Number(amount.value)
    }
    transactions.push(transaction);
    init();
    text.value = '';
    amount.value = '';
  }
}

function addTransactionInDOM(tr){
  const sign = tr.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(tr.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${tr.text}
    <span>${sign}${Math.abs(tr.amount)}</span>
    <button 
      class="delete-btn"
      onclick="removeTransaction(${tr.id})">X
    </button>`;
  list.appendChild(item);
}

function removeTransaction(id){
  transactions = 
    transactions.filter(transaction => transaction.id !== id);
  init();
}

function updateLS(){
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateValues(){
  const amounts = transactions.map(transaction => transaction.amount);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = Math.abs(amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0))
    .toFixed(2);
  const total = (income - expense)
  .toFixed(2);
  money_plus.innerHTML = `$${income}`;
  money_minus.innerHTML = `$${expense}`;
  balance.innerHTML = `$${total}`;
}

function init(){
  list.innerHTML = '';
  transactions.forEach(addTransactionInDOM);
  updateValues();
  updateLS();
}

init();

// Event Listener
form.addEventListener('submit', addTransactionInArray);
