import { initTRPC } from '@trpc/server';
import { GetTimeSeriesWeatherPropsSchema, TimeSeriesResponseSchema } from '../../app/schemas';
import { WeatherService } from '../../app/weatherService';

export function weatherServerTrpcAdapter(api: WeatherService, t: ReturnType<typeof initTRPC.create>) {
  return t.router({
    getTimeSeries: t.procedure
      .input(GetTimeSeriesWeatherPropsSchema)
      .output(TimeSeriesResponseSchema)
      .mutation(({ input }) => api.getTimeSeries(input)),
  });
}
