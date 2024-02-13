import { initTRPC } from '@trpc/server';
import { SetWeatherPropsSchema } from '../../app/schemas';
import { WeatherService } from '../../app/weatherService';

export function weatherInjestionTrpcAdapter(api: WeatherService, t: ReturnType<typeof initTRPC.create>) {
  return t.router({
    setWeather: t.procedure
      .input(SetWeatherPropsSchema)
      .mutation(({ input }) => api.setWeather(input)),
  });
}
