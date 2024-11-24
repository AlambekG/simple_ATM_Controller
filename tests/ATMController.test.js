const ATMController = require('../src/ATMController');

describe('ATMController', () => {
  let atm;

  beforeEach(() => {
    atm = new ATMController();
  });

  test('insert card', () => {
    atm.insertCard('1234567890');
    expect(atm.currentCard).toBe('1234567890');
  });

  test('verify correct PIN', () => {
    atm.insertCard('1234567890');
    const isValidPIN = atm.enterPIN('1234');
    expect(isValidPIN).toBe(true);
    expect(atm.authenticated).toBe(true);
  });

  test('reject incorrect PIN', () => {
    atm.insertCard('1234567890');
    const isValidPIN = atm.enterPIN('0000');
    expect(isValidPIN).toBe(false);
    expect(atm.authenticated).toBe(false);
  });

  test('select valid account type', () => {
    atm.insertCard('1234567890');
    atm.enterPIN('1234');
    const accountExists = atm.selectAccount('checking');
    expect(accountExists).toBe(true);
    expect(atm.selectedAccountType).toBe('checking');
  });

  test('check balance', () => {
    atm.insertCard('1234567890');
    atm.enterPIN('1234');
    atm.selectAccount('checking');
    const balance = atm.checkBalance();
    expect(balance).toBe(1000);
  });

  test('deposit funds', () => {
    atm.insertCard('1234567890');
    atm.enterPIN('1234');
    atm.selectAccount('checking');
    atm.deposit(500);
    const balance = atm.checkBalance();
    expect(balance).toBe(1500);
  });

  test('withdraw funds', () => {
    atm.insertCard('1234567890');
    atm.enterPIN('1234');
    atm.selectAccount('checking');
    atm.withdraw(300);
    const balance = atm.checkBalance();
    expect(balance).toBe(1200);
  });

  test('not withdraw funds if insufficient balance', () => {
    atm.insertCard('1234567890');
    atm.enterPIN('1234');
    atm.selectAccount('checking');
    expect(() => {
      atm.withdraw(2000);
    }).toThrow('Insufficient funds.');
  });

  test('reset state after ejecting card', () => {
    atm.insertCard('1234567890');
    atm.enterPIN('1234');
    atm.selectAccount('checking');
    atm.ejectCard();
    expect(atm.currentCard).toBe(null);
    expect(atm.authenticated).toBe(false);
    expect(atm.selectedAccountType).toBe(null);
  });
});
