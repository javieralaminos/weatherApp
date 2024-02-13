import { WeatherType } from '../../../models';
import { GetTimeSeriesWeatherProps, SetWeatherProps, TimeSeriesResponse } from '../../app/schemas';
import { ForManagingWeather } from '../../ports/driven/for-managing-weather';

export class WeatherRepositoryStubAdapter implements ForManagingWeather {
  public async getTimeSeries(_props: GetTimeSeriesWeatherProps): Promise<TimeSeriesResponse> {
    return {
      timeSeries: [
        {
          timestamp: new Date().getTime(),
          value: 20,
          type: WeatherType.pressure,
        },
      ],
    };
  }
  public async setWeather(props: SetWeatherProps): Promise<void> {
    console.log('WeatherRepositoryStubAdapter.setWeather', props);
  }
}
