import { trpcInstance } from './trpc';
import { GetTimeSeriesWeatherPropsSchema, TimeSeriesResponseSchema } from '../../app/schemas';
import { WeatherService } from '../../app/weatherService';

export function weatherServerTrpcAdapter(api: WeatherService) {
  return trpcInstance.router({
    getTimeSeries: trpcInstance.procedure
      .input(GetTimeSeriesWeatherPropsSchema)
      .output(TimeSeriesResponseSchema)
      .mutation(({ input }) => api.getTimeSeries(input)),
  });
}
