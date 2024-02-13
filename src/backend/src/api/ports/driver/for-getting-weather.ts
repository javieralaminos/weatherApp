import { GetTimeSeriesWeatherProps, TimeSeriesResponse } from '../../app/schemas';

export interface ForGettingWeather {
  getTimeSeries: (props: GetTimeSeriesWeatherProps) => Promise<TimeSeriesResponse>;
}
