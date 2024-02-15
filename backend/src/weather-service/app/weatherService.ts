import { AverageType } from './models';
import { GetTimeSeriesWeatherProps, TimeSeriesResponse, SetWeatherProps } from './schemas';
import { ForQueringWeather, MetricResponse } from '../ports/driven/for-quering-weather';
import { ForServingWeather, ForIngestingWeather } from '../ports/driver';

export class WeatherService implements ForServingWeather, ForIngestingWeather {
  constructor(private forManagingWeather: ForQueringWeather) {
  }

  public async setWeather(props: SetWeatherProps): Promise<void> {
    return this.forManagingWeather.setWeatherMetric(props);
  }

  public async getTimeSeries(props: GetTimeSeriesWeatherProps): Promise<TimeSeriesResponse> {
    const timeSeries = await this.forManagingWeather.getWeatherMetrics(props);
    const sortedResponse = timeSeries.sort((a, b) => a.datetime.localeCompare(b.datetime));
    return this.aggregateTimeSeriesPerAverage(sortedResponse, props.averageType);
  }

  private aggregateTimeSeriesPerAverage(timeSeries: MetricResponse[], averageType: AverageType): TimeSeriesResponse {
    if (averageType === 'hourly') {
      const hourlyTimeSeries = timeSeries.reduce((acc, curr) => {
        const key = curr.datetime.slice(0, 13) + ':00:00.000Z';
        if (acc[key]) {
          acc[key].push(curr);
        } else {
          acc[key] = [curr];
        }
        return acc;
      }, {} as Record<string, typeof timeSeries>);
      const hourlyAverages = Object.keys(hourlyTimeSeries).map((key) => {
        const average = hourlyTimeSeries[key].reduce((acc, curr) => acc + curr.value, 0) / hourlyTimeSeries[key].length;
        return { datetime: key, value: average, type: timeSeries[0].type };
      });
      return { timeSeries: hourlyAverages };
    } else if (averageType === 'daily') {
      const dailyTimeSeries = timeSeries.reduce((acc, curr) => {
        const key = curr.datetime.slice(0, 10) + 'T00:00:00.000Z';
        if (acc[key]) {
          acc[key].push(curr);
        } else {
          acc[key] = [curr];
        }
        return acc;
      }, {} as Record<string, typeof timeSeries>);
      const dailyAverages = Object.keys(dailyTimeSeries).map((key) => {
        const average = dailyTimeSeries[key].reduce((acc, curr) => acc + curr.value, 0) / dailyTimeSeries[key].length;
        return { datetime: key, value: average, type: timeSeries[0].type };
      });
      return { timeSeries: dailyAverages };
    } else {
      return { timeSeries };
    }
  }

}