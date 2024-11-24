const BankService = require('./BankService');

class ATMController {

  constructor() {
    this.bankService = new BankService();
    this.currentCard = null;
    this.authenticated = false;
    this.selectedAccountType = null;
  }

  insertCard(cardNumber) {
    this.currentCard = cardNumber;
    console.log(`Card ${cardNumber} inserted.`);
  }

  enterPIN(pin) {
    if (!this.currentCard) {
      throw new Error('No card inserted.');
    }
    const isValidPIN = this.bankService.verifyPIN(this.currentCard, pin);
    this.authenticated = isValidPIN;
    if (isValidPIN) {
      console.log('PIN verified.');
    } else {
      console.log('Invalid PIN.');
    }
    return isValidPIN;
  }

  selectAccount(accountType) {
    if (!this.authenticated) {
      throw new Error('User not authenticated.');
    }
    const accountExists = this.bankService.hasAccountType(this.currentCard, accountType);
    if (accountExists) {
      this.selectedAccountType = accountType;
      console.log(`Account ${accountType} selected.`);
    } else {
      console.log(`Account type ${accountType} does not exist.`);
    }
    return accountExists;
  }

  checkBalance() {
    if (!this.selectedAccountType) {
      throw new Error('No account selected.');
    }
    const balance = this.bankService.getBalance(this.currentCard, this.selectedAccountType);
    console.log(`Current balance: $${balance}`);
    return balance;
  }

  deposit(amount) {
    if (!this.selectedAccountType) {
      throw new Error('No account selected.');
    }
    this.bankService.deposit(this.currentCard, this.selectedAccountType, amount);
    console.log(`Deposited $${amount}.`);
  }

  withdraw(amount) {
    if (!this.selectedAccountType) {
      throw new Error('No account selected.');
    }
    const success = this.bankService.withdraw(this.currentCard, this.selectedAccountType, amount);
    if (success) {
      console.log(`Withdrew $${amount}.`);
    } else {
      console.log('Insufficient funds.');
      throw new Error('Insufficient funds.');
    }
  }

  ejectCard() {
    console.log(`Card ${this.currentCard} ejected.`);
    this.currentCard = null;
    this.authenticated = false;
    this.selectedAccountType = null;
  }
}

module.exports = ATMController;
