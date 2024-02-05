// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedListValues = [1, 2, 3]
    const expectedValue = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          }
        }
      }
    }

    const result = generateLinkedList(linkedListValues)
    expect(result).toStrictEqual(expectedValue)
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedListValues = [1, 2, 3]
    const result = generateLinkedList(linkedListValues)
    expect(result).toMatchSnapshot()
  });
});
