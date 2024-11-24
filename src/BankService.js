// const accounts = require('./Accounts');

const accounts = {
  '1234567890': {
    pin: '1234',
    accounts: {
      checking: 1000,
      savings: 5000,
    },
  },
  '0987654321': {
    pin: '4321',
    accounts: {
      checking: 5000,
      savings: 1000,
    },
  },
}

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
