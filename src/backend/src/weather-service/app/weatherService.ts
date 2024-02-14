import { GetTimeSeriesWeatherProps, TimeSeriesResponse, SetWeatherProps } from './schemas';
import { ForQueringWeather } from '../ports/driven/for-quering-weather';
import { ForServingWeather, ForIngestingWeather } from '../ports/driver';

export class WeatherService implements ForServingWeather, ForIngestingWeather {
  constructor(private forManagingWeather: ForQueringWeather) {
  }
  public async getTimeSeries(props: GetTimeSeriesWeatherProps): Promise<TimeSeriesResponse> {
    const timeSeries = await this.forManagingWeather.getWeatherMetrics(props);
    const sortedResponse = timeSeries.sort((a, b) => a.datetime.localeCompare(b.datetime));
    if (props.unit && props.type === 'temperature') {
      sortedResponse.forEach((item) => {
        item.value = props.unit === 'C' ? item.value : (item.value - 32) * 5 / 9;
      });
    } else if (props.unit && props.type === 'humidity') {
      sortedResponse.forEach((item) => {
        item.value = props.unit === 'mm' ? item.value : item.value * 25.4;
      });
    } else if (props.unit && props.type === 'pressure') {
      sortedResponse.forEach((item) => {
        item.value = props.unit === 'inHg' ? item.value : item.value * 33.8639;
      });
    }
    return { timeSeries: sortedResponse };
  }
  public async setWeather(props: SetWeatherProps): Promise<void> {
    if (props.unit && props.type === 'temperature') {
      props.value = props.unit === 'C' ? props.value : (props.value - 32) * 5 / 9;
    } else if (props.unit && props.type === 'humidity') {
      props.value = props.unit === 'mm' ? props.value : props.value * 25.4;
    } else if (props.unit && props.type === 'pressure') {
      props.value = props.unit === 'inHg' ? props.value : props.value * 33.8639;
    }
    return this.forManagingWeather.setWeatherMetric(props);
  }
}