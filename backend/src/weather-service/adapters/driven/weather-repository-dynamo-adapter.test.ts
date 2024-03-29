import { WeatherRepositoryDynamoAdapter } from './weather-repository-dynamo-adapter';
import { WeatherType } from '../../app/models';

describe('WeatherRepositoryDynamoAdapter', () => {
  let weatherRepository: WeatherRepositoryDynamoAdapter;

  beforeEach(() => {
    weatherRepository = new WeatherRepositoryDynamoAdapter();
  });

  describe('getWeatherMetrics', () => {
    it('should return time series data', async () => {
      // Mock the DynamoDBClient and its send method
      const mockSend = jest.fn().mockResolvedValue({
        Items: [
          {
            datetime: { S: '2022-01-01T00:00:00Z' },
            value: { N: '10' },
            type: { S: 'temperature' },
          },
          {
            datetime: { S: '2022-01-02T00:00:00Z' },
            value: { N: '15' },
            type: { S: 'temperature' },
          },
        ],
      });
      weatherRepository.client.send = mockSend;

      // Define the expected props
      const props = {
        startDate: '2022-01-01T00:00:00Z',
        endDate: '2022-01-02T00:00:00Z',
        type: WeatherType.temperature,
      };

      // Call the getWeatherMetrics method
      const result = await weatherRepository.getWeatherMetrics(props);

      // Verify the result
      expect(result).toEqual([
        {
          datetime: '2022-01-01T00:00:00Z',
          value: 10,
          type: 'temperature',
        },
        {
          datetime: '2022-01-02T00:00:00Z',
          value: 15,
          type: 'temperature',
        },
      ]);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if malformed response', async () => {
      // Mock the DynamoDBClient and its send method
      const mockSend = jest.fn().mockResolvedValue({});
      weatherRepository.client.send = mockSend;

      // Define the expected props
      const props = {
        startDate: '2022-01-01T00:00:00Z',
        endDate: '2022-01-02T00:00:00Z',
        type: WeatherType.temperature,
      };

      // Call the getWeatherMetrics method and expect it to throw an error
      await expect(weatherRepository.getWeatherMetrics(props)).rejects.toThrow('Malformed response from DynamoDB');
      expect(mockSend).toHaveBeenCalledTimes(1);
    });
  });

  describe('setWeather', () => {
    it('should set weather data', async () => {
      // Mock the DynamoDBClient and its send method
      const mockSend = jest.fn().mockResolvedValue({});
      weatherRepository.client.send = mockSend;

      // Define the expected props
      const props = {
        datetime: '2022-01-01T00:00:00Z',
        value: 10,
        type: WeatherType.temperature,
      };

      // Call the setWeather method
      await weatherRepository.setWeatherMetric(props);

      expect(mockSend).toHaveBeenCalledTimes(1);
    });
  });
});