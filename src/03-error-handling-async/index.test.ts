// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const mockValue = 'mock value'
    const result = await resolveValue(mockValue)
    expect(result).toBe(mockValue)
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect.assertions(2)

    const customErrorMessage = 'Smth happened'
    try {
      throwError(customErrorMessage)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', customErrorMessage)
    }
  });

  test('should throw error with default message if message is not provided', () => {
    expect.assertions(2)

    try {
      throwError()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'Oops!')
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect.assertions(2)

    try {
      throwCustomError()
    } catch (error) {
      expect(error).toBeInstanceOf(MyAwesomeError)
      expect(error).toHaveProperty('message', 'This is my awesome custom error!')
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(2)

    try {
      await rejectCustomError()
    } catch (error) {
      expect(error).toBeInstanceOf(MyAwesomeError)
      expect(error).toHaveProperty('message', 'This is my awesome custom error!')
    }
  });
});
