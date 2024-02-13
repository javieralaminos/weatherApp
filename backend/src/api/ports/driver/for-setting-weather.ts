import { SetWeatherProps } from '../../app/schemas';

export interface ForSettingWeather {
  setWeather: (props: SetWeatherProps) => Promise<void>;
}
