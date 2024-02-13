import { GetTimeSeriesWeatherProps, TimeSeriesResponse, SetWeatherProps } from '../../app/schemas';

export interface ForManagingWeather {
  getTimeSeries: (props: GetTimeSeriesWeatherProps) => Promise<TimeSeriesResponse>;
  setWeather: (props: SetWeatherProps) => Promise<void>;
}
