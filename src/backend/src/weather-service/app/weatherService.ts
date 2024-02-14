import { GetTimeSeriesWeatherProps, TimeSeriesResponse, SetWeatherProps } from './schemas';
import { ForQueringWeather } from '../ports/driven/for-quering-weather';
import { ForServingWeather, ForIngestingWeather } from '../ports/driver';

export class WeatherService implements ForServingWeather, ForIngestingWeather {
  constructor(private forManagingWeather: ForQueringWeather) {
  }
  public async getTimeSeries(props: GetTimeSeriesWeatherProps): Promise<TimeSeriesResponse> {
    const timeSeries = await this.forManagingWeather.getWeatherMetrics(props);
    return { timeSeries };
  }
  public async setWeather(props: SetWeatherProps): Promise<void> {
    return this.forManagingWeather.setWeatherMetric(props);
  }
}