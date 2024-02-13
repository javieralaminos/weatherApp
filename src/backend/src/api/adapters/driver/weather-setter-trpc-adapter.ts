import { initTRPC } from '@trpc/server';
import { StandardApi } from '../../app/api';
import { GetTimeSeriesWeatherPropsSchema, TimeSeriesResponseSchema } from '../../app/schemas';

export function weatherGetterTrpcAdapter(api: StandardApi, t: ReturnType<typeof initTRPC.create>) {
  return t.router({
    getTimeSeries: t.procedure
      .input(GetTimeSeriesWeatherPropsSchema)
      .output(TimeSeriesResponseSchema)
      .query(({ input }) => api.getTimeSeries(input)),
  });
}
