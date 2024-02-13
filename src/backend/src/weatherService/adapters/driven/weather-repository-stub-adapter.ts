import { WeatherType } from '../../../models';
import { GetTimeSeriesWeatherProps, SetWeatherProps, TimeSeriesResponse } from '../../app/schemas';
import { ForQueringWeather } from '../../ports/driven/for-quering-weather';

export class WeatherRepositoryStubAdapter implements ForQueringWeather {
  public async getTimeSeries(_props: GetTimeSeriesWeatherProps): Promise<TimeSeriesResponse> {
    return {
      timeSeries: [
        {
          datetime: '2020-01-01',
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
