import { WeatherType } from '../../app/models';
import { ForQueringWeather, GetWeatherMetricsProps, MetricResponse, SetWeatherMetricProps } from '../../ports/driven/for-quering-weather';

export class WeatherRepositoryStubAdapter implements ForQueringWeather {
  private readonly data: { datetime: string; value: number; type: WeatherType}[] = [];
  public async getWeatherMetrics(props: GetWeatherMetricsProps): Promise<MetricResponse[]> {
    return this.data.filter((item) => {
      return item.datetime >= props.startDate && item.datetime <= props.endDate && item.type === props.type;
    });
  }
  public async setWeatherMetric(props: SetWeatherMetricProps): Promise<void> {
    this.data.push(props);
  }
}
