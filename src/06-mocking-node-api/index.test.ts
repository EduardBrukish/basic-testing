// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(() => {}, 100)
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn()
    doStuffByTimeout(callback, 100)

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn()
    doStuffByInterval(callback, 100)

    jest.advanceTimersByTime(200);
    expect(setInterval).toHaveBeenCalled();
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval')
    const callback = jest.fn()
    doStuffByInterval(callback, 100)

    jest.advanceTimersByTime(300)
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.unmock('path');
    const path = jest.requireActual('path');
    path.join = jest.fn(() => null)

    const testFilePathName = 'test-path.txt'

    await readFileAsynchronously(testFilePathName)
    expect(path.join).toBeCalledWith(__dirname, testFilePathName)
  });

  test('should return null if file does not exist', async () => {
    jest.unmock('fs')
    const fs = jest.requireActual('fs')
    fs.existsSync = jest.fn(() => false)

    const testFileThatNotExist = 'nonexisting.txt'

    const result = await readFileAsynchronously(testFileThatNotExist)
    expect(result).toBeNull()
  });

  test('should return file content if file exists', async () => {
    const mockedFileContent = 'Mocked file content'
    require('fs').existsSync = jest.fn(() => true);
    require('fs/promises').readFile = jest.fn().mockResolvedValue(mockedFileContent)

    const testFileThatExist = 'existing-file.txt'

    const result = await readFileAsynchronously(testFileThatExist)
    expect(result).toBe(mockedFileContent)
  });
});
