import { WeatherType } from '../../../models';
import { GetTimeSeriesWeatherProps, SetWeatherProps, TimeSeriesResponse } from '../../app/schemas';
import { ForQueringWeather } from '../../ports/driven/for-quering-weather';

export class WeatherRepositoryStubAdapter implements ForQueringWeather {
  private readonly data: { datetime: string; value: number; type: WeatherType}[] = [];
  public async getTimeSeries(_props: GetTimeSeriesWeatherProps): Promise<TimeSeriesResponse> {
    return {
      timeSeries: this.data,
    };
  }
  public async setWeather(props: SetWeatherProps): Promise<void> {
    this.data.push(props);
  }
}
