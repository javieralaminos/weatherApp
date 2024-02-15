import { trpcInstance } from './trpc';
import { SetWeatherPropsSchema } from '../../app/schemas';
import { WeatherService } from '../../app/weatherService';

export function weatherIngestionTrpcAdapter(api: WeatherService) {
  return trpcInstance.router({
    setWeather: trpcInstance.procedure
      .input(SetWeatherPropsSchema)
      .mutation(({ input }) => api.setWeather(input)),
  });
}
