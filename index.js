class Account {

  constructor(username) {
    this.username = username;
    this.transactions = []; //entire transaction object is pushed, not just value
  }

  get balance() { //can be accessed like a property with get
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction); // transaction object as a parameter will be replaced with 'this' in practice since this will refer back to the transaction object
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      console.log (`Insufficient balance for withdrawal`);
      return;
    }
    this.time = new Date().toLocaleDateString();
    this.account.addTransaction(this); // this refers to the Transaction superclass object where value or get Value is a method/property and therefore the objects will have more than just value data if accessed through this.account.transactions
  }
}

class Deposit extends Transaction {

  get value() { // getter works well here because the property is the same (value) but their return values are different (positive for deposit and negative for withdrawls)
    return this.amount
  }

  isAllowed() {
    return true
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount
  }

  isAllowed() {
    return (this.account.balance > this.amount)
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Mickey Mouse");

t1 = new Deposit(50.25, myAccount);
t1.commit();
t2 = new Withdrawal(9, myAccount);
t2.commit();
console.log(myAccount.transactions); // CIRCULAR REFERENCE BC YOU ARE PASSING ENTIRE TRANSACTION OBJECT
console.log(myAccount.balance); // accesses balance through getter, feels like its a property of the object but the value is actually being calculated each time through the getter function
