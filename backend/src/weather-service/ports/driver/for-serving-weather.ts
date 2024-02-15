import { GetTimeSeriesWeatherProps, TimeSeriesResponse } from '../../app/schemas';

export interface ForServingWeather {
  getTimeSeries: (props: GetTimeSeriesWeatherProps) => Promise<TimeSeriesResponse>;
}
