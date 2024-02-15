import { WeatherType } from '../../app/models';

export interface GetWeatherMetricsProps {
  startDate: string;
  endDate: string;
  type: string;
}

export interface MetricResponse {
  datetime: string;
  value: number;
  type: WeatherType;
}

export interface SetWeatherMetricProps {
  datetime: string;
  value: number;
  type: WeatherType;
}


export interface ForQueringWeather {
  getWeatherMetrics: (props: GetWeatherMetricsProps) => Promise<MetricResponse[]>;
  setWeatherMetric: (props: SetWeatherMetricProps) => Promise<void>;
}
