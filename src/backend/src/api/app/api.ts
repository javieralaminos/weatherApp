import { GetTimeSeriesWeatherProps, TimeSeriesResponse, SetWeatherProps } from './schemas';
import { ForManagingWeather } from '../ports/driven/for-managing-weather';
import { ForGettingWeather, ForSettingWeather } from '../ports/driver';

export class StandardApi implements ForGettingWeather, ForSettingWeather {
  constructor(private forManagingWeather: ForManagingWeather) {
  }
  public async getTimeSeries(props: GetTimeSeriesWeatherProps): Promise<TimeSeriesResponse> {
    return this.forManagingWeather.getTimeSeries(props);
  }
  public async setWeather(props: SetWeatherProps): Promise<void> {
    return this.forManagingWeather.setWeather(props);
  }
}