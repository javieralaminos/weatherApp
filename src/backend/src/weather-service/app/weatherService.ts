import { GetTimeSeriesWeatherProps, TimeSeriesResponse, SetWeatherProps } from './schemas';
import { ForQueringWeather } from '../ports/driven/for-quering-weather';
import { ForServingWeather, ForIngestingWeather } from '../ports/driver';

export class WeatherService implements ForServingWeather, ForIngestingWeather {
  constructor(private forManagingWeather: ForQueringWeather) {
  }
  public async getTimeSeries(props: GetTimeSeriesWeatherProps): Promise<TimeSeriesResponse> {
    const timeSeries = await this.forManagingWeather.getWeatherMetrics(props);
    const sortedResponse = timeSeries.sort((a, b) => a.datetime.localeCompare(b.datetime));
    if (props.averageType === 'hourly') {
      const hourlyTimeSeries = sortedResponse.reduce((acc, curr) => {
        const date = new Date(curr.datetime);
        const hour = date.getHours();
        const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${hour}`;
        if (acc[key]) {
          acc[key].push(curr);
        } else {
          acc[key] = [curr];
        }
        return acc;
      }, {} as Record<string, typeof sortedResponse>);
      const hourlyAverages = Object.values(hourlyTimeSeries).map((d) => {
        const average = d.reduce((acc, curr) => acc + curr.value, 0) / d.length;
        return { datetime: d[0].datetime, value: average, type: d[0].type };
      });
      return { timeSeries: hourlyAverages };
    } else if (props.averageType === 'daily') {
      const dailyTimeSeries = sortedResponse.reduce((acc, curr) => {
        const date = new Date(curr.datetime);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        if (acc[key]) {
          acc[key].push(curr);
        } else {
          acc[key] = [curr];
        }
        return acc;
      }, {} as Record<string, typeof sortedResponse>);
      const dailyAverages = Object.values(dailyTimeSeries).map((d) => {
        const average = d.reduce((acc, curr) => acc + curr.value, 0) / d.length;
        return { datetime: d[0].datetime, value: average, type: d[0].type };
      });
      return { timeSeries: dailyAverages };
    } else {
      return { timeSeries: sortedResponse };
    }
  }
  public async setWeather(props: SetWeatherProps): Promise<void> {
    return this.forManagingWeather.setWeatherMetric(props);
  }
}