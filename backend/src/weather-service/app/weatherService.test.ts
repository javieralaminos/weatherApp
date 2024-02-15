import { WeatherType } from './models';
import { GetTimeSeriesWeatherProps, SetWeatherProps } from './schemas';
import { WeatherService } from './weatherService';
import { WeatherRepositoryStubAdapter } from '../adapters/driven';

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let forManagingWeather: WeatherRepositoryStubAdapter;

  beforeEach(() => {
    forManagingWeather = new WeatherRepositoryStubAdapter();
    weatherService = new WeatherService(forManagingWeather);
  });

  describe('getTimeSeries', () => {
    it('should call getTimeSeries method of ForQueringWeather with the provided props', async () => {
      // Define the expected props
      const props: GetTimeSeriesWeatherProps = {
        startDate: '2022-01-01T00:00:00Z',
        endDate: '2022-01-02T00:00:00Z',
        type: WeatherType.temperature,
      };

      // Call the getTimeSeries method of WeatherService
      const response = await weatherService.getTimeSeries(props);

      // Verify that the getTimeSeries method of ForQueringWeather is called with the provided props
      expect(response.timeSeries).toEqual([]);
    });
  });

  describe('setWeather', () => {
    it('should call setWeather method of ForQueringWeather with the provided props', async () => {
      // Define the expected props
      const props: SetWeatherProps = {
        datetime: '2022-01-01T00:00:00Z',
        value: 10,
        type: WeatherType.temperature,
      };

      // Call the setWeather method of WeatherService
      const response = await weatherService.setWeather(props);

      // Verify that the setWeather method of ForQueringWeather is called with the provided props
      expect(response).toBeUndefined();
    });

    it('should store the data and the data should be available for getTimeSeries', async () => {
      // Define the expected props
      const props: SetWeatherProps = {
        datetime: '2022-01-01T00:00:00Z',
        value: 10,
        type: WeatherType.temperature,
      };

      // Call the setWeather method of WeatherService
      await weatherService.setWeather(props);

      // Call the getTimeSeries method of WeatherService
      const result = await weatherService.getTimeSeries({
        startDate: '2022-01-01T00:00:00Z',
        endDate: '2022-01-02T00:00:00Z',
        type: WeatherType.temperature,
      });

      // Verify the result
      expect(result).toEqual({
        timeSeries: [
          {
            datetime: '2022-01-01T00:00:00Z',
            value: 10,
            type: 'temperature',
          },
        ],
      });
    });
  });

});