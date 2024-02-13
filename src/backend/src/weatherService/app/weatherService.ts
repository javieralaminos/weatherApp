import { GetTimeSeriesWeatherProps, TimeSeriesResponse, SetWeatherProps } from './schemas';
import { ForQueringWeather } from '../ports/driven/for-quering-weather';
import { ForServingWeather, ForInjestingWeather } from '../ports/driver';

export class WeatherService implements ForServingWeather, ForInjestingWeather {
  constructor(private forManagingWeather: ForQueringWeather) {
  }
  public async getTimeSeries(props: GetTimeSeriesWeatherProps): Promise<TimeSeriesResponse> {
    return this.forManagingWeather.getTimeSeries(props);
  }
  public async setWeather(props: SetWeatherProps): Promise<void> {
    return this.forManagingWeather.setWeather(props);
  }
}