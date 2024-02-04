// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  return  {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => {console.log('ONE')}),
    mockTwo: jest.fn(() => {}),
    mockThree: jest.fn(() => {}),
    unmockedFunction: jest.requireActual<typeof import('./index')>('./index').unmockedFunction,
  }
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLogFn = jest.spyOn(console, "log")
    mockOne()
    mockTwo()
    mockThree()
    expect(consoleLogFn).toBeCalledTimes(0)
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogFn = jest.spyOn(console, "log")
    unmockedFunction()
    expect(consoleLogFn).toBeCalledTimes(1)
  });
});
