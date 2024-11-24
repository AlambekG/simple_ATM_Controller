const accounts = require('./Accounts');

class BankService {
  constructor() {
    this.accounts = accounts;
  }

  verifyPIN(cardNumber, pin) {
    const account = this.accounts[cardNumber];
    return account && account.pin === pin;
  }

  hasAccountType(cardNumber, accountType) {
    const account = this.accounts[cardNumber];
    return account && account.accounts[accountType] !== undefined;
  }

  getBalance(cardNumber, accountType) {
    return this.accounts[cardNumber].accounts[accountType];
  }

  deposit(cardNumber, accountType, amount) {
    this.accounts[cardNumber].accounts[accountType] += amount;
  }

  withdraw(cardNumber, accountType, amount) {
    const balance = this.accounts[cardNumber].accounts[accountType];
    if (balance >= amount) {
      this.accounts[cardNumber].accounts[accountType] -= amount;
      return true;
    }
    return false;
  }
}

module.exports = BankService;
