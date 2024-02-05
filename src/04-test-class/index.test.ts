// Uncomment the code below and write your tests
import { getBankAccount } from '.';

jest.unmock('lodash');
const lodash = jest.requireActual('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(100)
    const balance = bankAccount.getBalance()
    expect(balance).toBe(100)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect.assertions(2)
    const bankAccount = getBankAccount(100)
    try {
      bankAccount.withdraw(200)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', `Insufficient funds: cannot withdraw more than ${bankAccount.getBalance()}`)
    }
  });

  test('should throw error when transferring more than balance', () => {
    expect.assertions(2)
    const bankAccount = getBankAccount(100)
    const bankAccountToTransfer = getBankAccount(0)
    try {
      bankAccount.transfer(200, bankAccountToTransfer)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', `Insufficient funds: cannot withdraw more than ${bankAccount.getBalance()}`)
    }
  });

  test('should throw error when transferring to the same account', () => {
    expect.assertions(2)
    const bankAccount = getBankAccount(100)
    try {
      bankAccount.transfer(200, bankAccount)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'Transfer failed')
    }
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(100)
    bankAccount.deposit(50)
    const balance = bankAccount.getBalance()
    expect(balance).toBe(150)
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(100)
    bankAccount.withdraw(50)
    const balance = bankAccount.getBalance()
    expect(balance).toBe(50)
  });

  test('should transfer money', () => {
    const bankAccountSender = getBankAccount(150)
    const bankAccountRecipient = getBankAccount(10)

    bankAccountSender.transfer(100, bankAccountRecipient)

    const balanceSender = bankAccountSender.getBalance()
    const balanceRecipient = bankAccountRecipient.getBalance()
    expect(balanceSender).toBe(50)
    expect(balanceRecipient).toBe(110)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 11);

    const bankAccount = getBankAccount(0)
    const balance = await bankAccount.fetchBalance()
    expect(balance).toBe(11)
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 23);

    const bankAccount = getBankAccount(0)

    await bankAccount.synchronizeBalance()

    const balance = bankAccount.getBalance()
    expect(balance).toBe(23)
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn(() => null)
    expect.assertions(2)

    const bankAccount = getBankAccount(0)

    try {
      await bankAccount.synchronizeBalance()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'Synchronization failed')
    }
  });
});
