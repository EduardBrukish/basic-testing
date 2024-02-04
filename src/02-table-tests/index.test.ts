// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 6, b: 3, action: Action.Subtract, expected: 3 },
  { a: 3, b: 6, action: Action.Subtract, expected: -3 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: 6, b: 3, action: Action.Multiply, expected: 18 },
  { a: 3, b: 0, action: Action.Multiply, expected: 0 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 0, b: 5, action: Action.Divide, expected: 0 },
  { a: 3, b: 3, action: Action.Divide, expected: 1 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 0, b: 3, action: Action.Exponentiate, expected: 0 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 1, b: '', action: Action.Exponentiate, expected: null },
  { a: '', b: 3, action: Action.Exponentiate, expected: null },
  { a: null, b: null, action: Action.Exponentiate, expected: null },
]; 

describe('simpleCalculator', () => {
  test.each(testCases)('should calculate correctly', (testCaseData) => {
    const result = simpleCalculator(testCaseData)
    expect(result).toBe(testCaseData.expected);
  });
});
