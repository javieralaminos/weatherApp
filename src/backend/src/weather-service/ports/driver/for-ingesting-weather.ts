import { SetWeatherProps } from '../../app/schemas';

export interface ForIngestingWeather {
  setWeather: (props: SetWeatherProps) => Promise<void>;
}
