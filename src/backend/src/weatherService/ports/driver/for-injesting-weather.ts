import { SetWeatherProps } from '../../app/schemas';

export interface ForInjestingWeather {
  setWeather: (props: SetWeatherProps) => Promise<void>;
}
