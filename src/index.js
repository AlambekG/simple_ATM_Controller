const ATMController = require('./ATMController');

const atm = new ATMController();

try {
  atm.insertCard('1234567890');
  atm.enterPIN('1234');
  atm.selectAccount('checking');
  atm.checkBalance();
  atm.deposit(500);
  atm.withdraw(200);
  atm.checkBalance();
  atm.ejectCard();
} catch (error) {
  console.error(error.message);
}
