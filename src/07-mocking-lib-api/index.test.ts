// Uncomment the code below and write your tests
import axios from 'axios'
import { throttledGetDataFromApi } from './index'

jest.mock('axios', () => ({create: jest.fn()}))
jest.mock('lodash', () => ({throttle: (fn: Function) => fn}))

const baseURL = 'https://jsonplaceholder.typicode.com'
const mockPath = '/mock/path/path'

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockedAxiosInstance = {
      get: jest.fn().mockResolvedValue({}),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(mockedAxiosInstance)

    await throttledGetDataFromApi(mockPath)

    jest.runAllTimers()

    expect(axios.create).toBeCalledTimes(1)
    expect(axios.create).toBeCalledWith({baseURL})
  });

  test('should perform request to correct provided url', async () => {
    const mockedAxiosInstance = {
      get: jest.fn().mockResolvedValue({}),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(mockedAxiosInstance)

    await throttledGetDataFromApi(mockPath)

    jest.runAllTimers()

    expect(mockedAxiosInstance.get).toBeCalledWith(mockPath)
  });

  test('should return response data', async () => {
    const mockResponseData = 'Mock data'
    const mockedAxiosInstance = {
      get: jest.fn().mockResolvedValue({data: mockResponseData}),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(mockedAxiosInstance)

    const result = await throttledGetDataFromApi(mockPath)

    jest.runAllTimers()

    expect(result).toBe(mockResponseData)
  });
});
